/*
 * Gina · CRM Strategy — <keyed-video>
 * © 2026 Isaac Antunes. All rights reserved.
 *
 * <keyed-video src crop="x,y,w,h" masks="x,y,w,h|…" scale="0.6"
 *              mobile-src mobile-crop mobile-masks mobile-scale>
 * Plays a muted looping video and removes its light paper background frame by
 * frame. The flood fill starts at the crop edges, so enclosed whites (the eyes)
 * survive. The poster is the page's first frame and stays until the first keyed
 * frame is drawn. It is also the fallback when the video is not worth its cost:
 * reduced motion, Save-Data or a 2G connection, file:// (canvas is tainted), or a
 * device that can't key a frame fast enough. The video loads only after the page
 * has finished loading, and phones get a small pre-cropped copy (mobile-*).
 */
(function () {
  'use strict';
  if (customElements.get('keyed-video')) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conn = navigator.connection || {};
  const saveData = conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType || '');
  const FRAME_BUDGET_MS = 30; // slower than this and the loop can't hold 30 fps
  const SLOW_WINDOWS = 2;     // consecutive 30-frame windows over budget before giving up

  // Run after the page has loaded and the browser is idle, so the video never competes with content.
  const whenIdle = (fn) => {
    const go = () => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200));
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });
  };
  const fill = 'position:absolute;inset:0;width:100%;height:100%;object-fit:contain';

  // Background = light and nearly grey (paper tone).
  function isPaper(d, p) {
    const i = p * 4, r = d[i], g = d[i + 1], b = d[i + 2];
    const mn = Math.min(r, g, b), mx = Math.max(r, g, b);
    return mn > 160 && mx - mn < 42;
  }

  class KeyedVideo extends HTMLElement {
    connectedCallback() {
      if (this._init) return;
      this._init = true;
      this.style.display = 'block';
      this.style.position = 'relative';

      // The page ships the poster as a plain <img>, so the first frame needs no script.
      this._poster = this._posterEl = this.querySelector('img');
      if (this._poster) this._poster.style.cssText = fill;
      if (reduceMotion || saveData) return;
      whenIdle(() => { if (this.isConnected) this._start(); });
    }

    _start() {
      // Phones get the small pre-cropped video when the page provides one.
      const small = this.hasAttribute('mobile-src') && window.matchMedia('(max-width: 719px)').matches;
      const attr = (name) => this.getAttribute((small ? 'mobile-' : '') + name);
      const crop = (attr('crop') || '0,0,1280,720').split(',').map(Number);
      const scale = Number(attr('scale') || 0.6);
      this._crop = crop;
      this._scale = scale;
      this._masks = (attr('masks') || '').split('|').filter(Boolean).map((m) => m.split(',').map(Number));
      this._w = Math.round(crop[2] * scale);
      this._h = Math.round(crop[3] * scale);
      this._seen = new Uint8Array(this._w * this._h);
      this._stack = new Int32Array(this._w * this._h * 4);

      const canvas = document.createElement('canvas');
      canvas.width = this._w;
      canvas.height = this._h;
      canvas.style.cssText = fill;
      this._canvas = canvas;
      this.appendChild(canvas);
      this._ctx = canvas.getContext('2d', { willReadFrequently: true });

      const v = document.createElement('video');
      v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto';
      v.disableRemotePlayback = true;
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.src = attr('src');
      v.style.cssText = fill + ';opacity:0;pointer-events:none';
      this.appendChild(v);
      this._v = v;

      let spent = 0, frames = 0, slow = 0;
      const loop = () => {
        const t0 = performance.now();
        this._frame();
        spent += performance.now() - t0;
        if (++frames === 30) {
          slow = spent / frames > FRAME_BUDGET_MS ? slow + 1 : 0;
          spent = frames = 0;
          if (slow >= SLOW_WINDOWS) return this._giveUp();
        }
        if (!v.paused) v.requestVideoFrameCallback ? v.requestVideoFrameCallback(loop) : requestAnimationFrame(loop);
        else this._running = false;
      };
      v.addEventListener('loadeddata', () => this._frame());
      v.addEventListener('playing', () => { if (!this._running) { this._running = true; loop(); } });

      // Only decode while on screen.
      this._io = new IntersectionObserver((entries) => entries.forEach((e) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      }));
      this._io.observe(this);
    }

    // The device can't key frames fast enough: put the poster back and stop decoding.
    _giveUp() {
      if (this._io) this._io.disconnect();
      this._v.pause();
      this._v.remove();
      this._canvas.remove();
      if (this._posterEl) this.appendChild(this._posterEl);
      this._poster = null;
    }

    disconnectedCallback() {
      if (this._io) this._io.disconnect();
      if (this._v) this._v.pause();
    }

    _frame() {
      const v = this._v;
      if (v.readyState < 2) return;
      const [cx, cy, cw, ch] = this._crop, w = this._w, h = this._h, s = this._scale, ctx = this._ctx;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(v, cx, cy, cw, ch, 0, 0, w, h);

      let img;
      try { img = ctx.getImageData(0, 0, w, h); } catch (e) { return; } // tainted canvas: keep the poster
      const d = img.data;

      // Paint masked regions (logos, captions in the source video) as paper so they get keyed out.
      for (const [mx, my, mw, mh] of this._masks) {
        const x0 = Math.max(0, Math.round((mx - cx) * s)), y0 = Math.max(0, Math.round((my - cy) * s));
        const x1 = Math.min(w, Math.round((mx + mw - cx) * s)), y1 = Math.min(h, Math.round((my + mh - cy) * s));
        for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
          const i = (y * w + x) * 4;
          d[i] = d[i + 1] = d[i + 2] = 245;
        }
      }

      // Flood fill from the edges: every connected paper pixel becomes transparent.
      const seen = this._seen, st = this._stack;
      let sp = 0;
      seen.fill(0);
      for (let x = 0; x < w; x++) { st[sp++] = x; st[sp++] = (h - 1) * w + x; }
      for (let y = 0; y < h; y++) { st[sp++] = y * w; st[sp++] = y * w + w - 1; }
      while (sp > 0) {
        const p = st[--sp];
        if (seen[p] || !isPaper(d, p)) continue;
        seen[p] = 1;
        d[p * 4 + 3] = 0;
        const x = p % w;
        if (x > 0 && !seen[p - 1]) st[sp++] = p - 1;
        if (x < w - 1 && !seen[p + 1]) st[sp++] = p + 1;
        if (p >= w && !seen[p - w]) st[sp++] = p - w;
        if (p < w * (h - 1) && !seen[p + w]) st[sp++] = p + w;
      }

      // 3px ring around the cut: fade light pixels and darken them toward the outline.
      for (let pass = 1; pass <= 3; pass++) {
        const mark = pass + 1, lo = 70 + pass * 25;
        for (let p = w; p < w * (h - 1); p++) {
          if (seen[p]) continue;
          const x = p % w;
          if (x === 0 || x === w - 1) continue;
          if (seen[p - 1] !== pass && seen[p + 1] !== pass && seen[p - w] !== pass && seen[p + w] !== pass) continue;
          seen[p] = mark;
          const i = p * 4, mn = Math.min(d[i], d[i + 1], d[i + 2]);
          if (mn > lo) {
            const t = Math.min(1, (mn - lo) / (190 - lo)), k = 1 - 0.55 * t;
            d[i + 3] = Math.round(d[i + 3] * (1 - t));
            d[i] *= k; d[i + 1] *= k; d[i + 2] *= k;
          }
        }
      }

      ctx.putImageData(img, 0, 0);
      if (this._poster) { this._poster.remove(); this._poster = null; }
    }
  }

  customElements.define('keyed-video', KeyedVideo);
})();
