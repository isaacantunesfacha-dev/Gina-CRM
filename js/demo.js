/*
 * Gina · CRM Strategy — demo interface
 * © 2026 Isaac Antunes. All rights reserved.
 *
 * Reads the pasted orders, runs window.Gina (js/gina.js) and renders the
 * Monday report and one row per customer. Nothing leaves the browser.
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

  function row(c) {
    const act = copy.actions[c.action];
    const msg = act.msg ? fill(act.msg, { first: c.first, days: c.recency }) : '';
    const last = c.recency === 0 ? copy.today : fill(copy.daysAgo, { n: c.recency });
    const usual = c.usual ? fill(copy.every, { n: c.usual }) : copy.once;
    return `<tr class="is-${c.action}">
      <td data-label="${esc(copy.cols.customer)}"><strong>${esc(c.name)}</strong><span class="demo-table__meta">${c.orders} · ${money.format(c.spend)}</span></td>
      <td data-label="${esc(copy.cols.last)}">${esc(last)}</td>
      <td data-label="${esc(copy.cols.usual)}">${esc(usual)}</td>
      <td data-label="${esc(copy.cols.rfv)}"><span class="mono">${c.rfv.r}·${c.rfv.f}·${c.rfv.v}</span></td>
      <td data-label="${esc(copy.cols.status)}"><span class="tag tag--${c.status}">${esc(copy.status[c.status])}</span></td>
      <td data-label="${esc(copy.cols.action)}" class="demo-table__action">
        <p class="act__name">${esc(act.name)}</p>
        <p class="act__channel">${esc(act.channel)}</p>
        ${msg ? `<blockquote class="act__msg">${esc(msg)}</blockquote>
        <button class="act__copy" type="button" data-copy="${esc(msg)}">${esc(copy.copy)}</button>` : ''}
        <p class="act__why">${esc(act.why)}</p>
      </td>
    </tr>`;
  }

  function run() {
    const today = G.todayUTC();
    const { orders, errors } = G.parseOrders(input.value, today);

    errorsEl.innerHTML = errors.map((e) => `<li>${esc(fill(copy.skipped, { n: e.line, reason: copy.reasons[e.reason] }))}</li>`).join('');

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

    rows.innerHTML = customers.map(row).join('');
    results.hidden = false;
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  $('[data-example]').addEventListener('click', () => { loadExample(); run(); });
  $('[data-clear]').addEventListener('click', () => { input.value = ''; run(); input.focus(); });

  rows.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    const done = () => { btn.textContent = copy.copied; setTimeout(() => { btn.textContent = copy.copy; }, 1600); };
    if (navigator.clipboard) navigator.clipboard.writeText(btn.dataset.copy).then(done, () => {});
  });

  // Open with the example already running, so the demo shows itself.
  loadExample();
  run();
})();
