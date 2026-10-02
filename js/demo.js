/*
 * Gina · CRM Strategy — demo interface
 * © 2026 Isaac Antunes. All rights reserved.
 *
 * Reads the pasted orders, runs window.Gina (js/gina.js) and renders the
 * Monday report, one card per customer to contact and a short list of those
 * who get no message. Mobile-first: results come before the input.
 * Nothing leaves the browser.
 */
(function () {
  'use strict';

  const G = window.Gina;
  const copy = JSON.parse(document.getElementById('demo-copy').textContent);
  const $ = (sel) => document.querySelector(sel);

  const form = $('[data-form]'), input = $('#orders');
  const errorsEl = $('[data-errors]'), bubble = $('[data-bubble]');
  const reportEl = $('[data-report]'), reportLines = $('[data-report-lines]');
  const results = $('[data-results]'), rows = $('[data-rows]');
  const rowsK = $('[data-rows-k]');
  const calm = $('[data-calm]'), calmList = $('[data-calm-list]'), own = $('[data-own]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const QUIET_ACTIONS = ['rest', 'none'];

  // Everything that came from the textarea goes through esc() before innerHTML.
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fill = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : ''));
  const list = (names) => new Intl.ListFormat(copy.lang, { type: 'conjunction' }).format(names);
  const money = new Intl.NumberFormat(copy.lang, { maximumFractionDigits: 0 });
  const isPt = copy.lang.startsWith('pt');

  function dateText(t) {
    const d = new Date(t), p = (n) => String(n).padStart(2, '0');
    return isPt
      ? `${p(d.getUTCDate())}/${p(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`
      : `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())}`;
  }

  function loadExample() {
    const sep = isPt ? '; ' : ', ';
    input.value = G.exampleOrders(G.todayUTC()).map((o) => [o.name, dateText(o.date), o.amount].join(sep)).join('\n');
  }

  function meta(c) {
    const last = c.recency === 0 ? copy.today : fill(copy.daysAgo, { n: c.recency });
    // One order says "one order" once; several orders on a single day have no rhythm yet.
    const usual = c.usual ? fill(copy.every, { n: c.usual }) : c.orders === 1 ? copy.once : null;
    const count = c.orders === 1 ? null : fill(copy.orders, { n: c.orders });
    const id = c.id ? fill(copy.id, { id: c.id }) : null;
    return [id, last, usual, `${copy.rfv} ${c.rfv.r}·${c.rfv.f}·${c.rfv.v}`, count].filter(Boolean).join(' · ');
  }

  const tag = (c) => `<span class="tag tag--${c.status}">${esc(copy.status[c.status])}</span>`;

  function card(c, i) {
    const act = copy.actions[c.action];
    const msg = fill(act.msg, { first: c.first, days: c.recency });
    return `<li class="card" style="--i:${i}">
      <div class="card__head"><h3 class="card__name">${esc(c.name)}</h3>${tag(c)}</div>
      <p class="card__meta">${esc(meta(c))}</p>
      <p class="act__name">${esc(act.name)}</p>
      <p class="act__channel">${esc(act.channel)}</p>
      <blockquote class="act__msg">${esc(msg)}</blockquote>
      <button class="act__copy" type="button" data-copy="${esc(msg)}">${esc(copy.copy)}</button>
      <p class="act__why">${esc(act.why)}</p>
    </li>`;
  }

  function calmItem(c) {
    const act = copy.actions[c.action];
    return `<li><span class="calm__name">${esc(c.name)}</span>${tag(c)}<span class="calm__why">${esc(act.why)}</span></li>`;
  }

  function run(fromUser) {
    const today = G.todayUTC();
    const { orders, errors, warnings } = G.parseOrders(input.value, today);

    errorsEl.innerHTML = [
      ...errors.map((e) => fill(copy.skipped, { n: e.line, reason: copy.reasons[e.reason] })),
      ...warnings.map((w) => fill(copy.duplicate, { n: w.line, m: w.of })),
    ].map((l) => `<li>${esc(l)}</li>`).join('');
    if (errors.length || warnings.length) own.open = true;

    if (!orders.length) {
      bubble.textContent = copy.empty;
      reportEl.hidden = true;
      results.hidden = true;
      return;
    }

    const customers = G.analyse(orders, today);
    const r = G.report(customers);
    const n = r.contact.length;
    bubble.textContent = n === 0 ? copy.bubble.none : n === 1 ? copy.bubble.one : fill(copy.bubble.some, { n });

    const lines = [n ? fill(copy.report.contact, { list: list(r.contact) }) : copy.report.contactNone];
    if (r.quiet.length) lines.push(fill(copy.report.quiet, { list: list(r.quiet) }));
    if (r.rhythm) lines.push(fill(copy.report.rhythm, { n: r.rhythm }));
    reportLines.innerHTML = lines.map((l) => `<li>${esc(l)}</li>`).join('');
    reportEl.hidden = false;

    const active = customers.filter((c) => !QUIET_ACTIONS.includes(c.action));
    const quiet = customers.filter((c) => QUIET_ACTIONS.includes(c.action));
    rows.innerHTML = active.map(card).join('');
    rowsK.hidden = !active.length;
    calmList.innerHTML = quiet.map(calmItem).join('');
    calm.hidden = !quiet.length;
    results.hidden = false;

    // After a run the user started, bring Gina's answer into view.
    if (fromUser) $('.demo__top').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); run(true); });
  $('[data-example]').addEventListener('click', () => { loadExample(); run(true); });
  $('[data-clear]').addEventListener('click', () => { input.value = ''; run(false); input.focus(); });

  rows.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    const done = () => { btn.textContent = copy.copied; setTimeout(() => { btn.textContent = copy.copy; }, 1600); };
    if (navigator.clipboard) navigator.clipboard.writeText(btn.dataset.copy).then(done, () => {});
  });

  // Open with the example already running, so the demo shows itself.
  loadExample();
  run(false);
})();
