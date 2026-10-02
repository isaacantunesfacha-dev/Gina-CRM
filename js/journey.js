/*
 * Gina · CRM Strategy — 360° journey
 * © 2026 Isaac Antunes. All rights reserved.
 *
 * Gina walks the channel track frame by frame and stops at each channel.
 * Each stop highlights that channel's piece and reveals one trait of the
 * customer profile. With reduced motion, the journey shows its final state.
 */
(function () {
  'use strict';

  const FRAMES = 9;        // assets/gina-walk/f1–f9.png
  const STOPS = [10, 30, 50, 70, 90]; // % along the track, matches the dots
  const TICK_MS = 110;     // one animation frame
  const WALK = 12;         // ticks spent walking between stops
  const SEGMENT = 26;      // ticks per stop (walk + pause)
  const LOOP = SEGMENT * STOPS.length;

  function init(section) {
    const walker = section.querySelector('[data-walker]');
    const dots = section.querySelectorAll('[data-stop]');
    const cards = section.querySelectorAll('[data-channel]');
    const traits = section.querySelectorAll('[data-trait]');
    const base = walker.dataset.frames;
    const frames = Array.from({ length: FRAMES }, (_, i) => `${base}f${i + 1}.png`);
    frames.forEach((src) => { new Image().src = src; }); // preload

    let current = null;
    function setStop(stop) {
      if (stop === current) return;
      current = stop;
      dots.forEach((el, i) => el.classList.toggle('is-reached', i <= stop));
      traits.forEach((el, i) => el.classList.toggle('is-reached', i <= stop));
      cards.forEach((el, i) => el.classList.toggle('is-current', i === stop));
    }

    function render(x, frame, stop) {
      walker.style.left = x + '%';
      const src = frames[frame];
      if (walker.getAttribute('src') !== src) walker.src = src;
      setStop(stop);
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      render(STOPS[STOPS.length - 1], 0, STOPS.length - 1);
      return;
    }

    section.classList.add('is-live');

    let tick = 0, timer = null;
    function step() {
      const k = Math.floor(tick / SEGMENT), l = tick % SEGMENT;
      if (l < WALK) {
        const from = k === 0 ? 0 : STOPS[k - 1];
        render(from + (STOPS[k] - from) * (l / WALK), tick % FRAMES, k - 1);
      } else {
        render(STOPS[k], Math.floor(l / 4) % 2, k); // idle: sway between f1 and f2
      }
      tick = (tick + 1) % LOOP;
    }

    // Run only while the section is on screen.
    new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting && !timer) { step(); timer = setInterval(step, TICK_MS); }
      else if (!e.isIntersecting && timer) { clearInterval(timer); timer = null; }
    })).observe(section);
  }

  document.querySelectorAll('[data-journey]').forEach(init);
})();
