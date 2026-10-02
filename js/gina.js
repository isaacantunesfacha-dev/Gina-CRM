/*
 * Gina · CRM Strategy — the method as code
 * © 2026 Isaac Antunes. All rights reserved.
 *
 * Pure functions, no DOM: parse a list of orders, read each customer's own
 * rhythm, score RFV and decide the next action. Same rules as the page:
 *   missed  = more than 1.5× their usual interval since the last order
 *   dormant = more than 3× → left alone for 90 days
 *   high value = top third in frequency and in spend → a person, not an email
 */
(function (root) {
  'use strict';

  const DAY = 86400000;
  const MISSED = 1.5;
  const DORMANT = 3;
  const NEW_DAYS = 30;

  // Order of the weekly list: who needs a person first, who needs nothing last.
  const PRIORITY = ['personal', 'usual', 'second', 'welcome', 'rest', 'none'];

  /** Midnight UTC for a calendar date, so day counts ignore time zones and DST. */
  const utcDay = (y, m, d) => Date.UTC(y, m - 1, d);

  function parseDate(raw) {
    const s = raw.trim();
    let y, m, d, match;
    if ((match = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))) [, y, m, d] = match;
    else if ((match = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/))) [, d, m, y] = match;
    else return null;
    const t = utcDay(+y, +m, +d);
    const back = new Date(t);
    // Reject impossible dates such as 31/02.
    return back.getUTCDate() === +d && back.getUTCMonth() === +m - 1 ? t : null;
  }

  function parseAmount(raw) {
    let s = raw.replace(/[^\d.,-]/g, '');
    if (!s) return null;
    const lastComma = s.lastIndexOf(','), lastDot = s.lastIndexOf('.');
    // The separator that comes last is the decimal one; the other is thousands.
    if (lastComma > lastDot) s = s.replace(/\./g, '').replace(',', '.');
    else s = s.replace(/,/g, '');
    const n = Number(s);
    return Number.isFinite(n) && n >= 0 ? n : null;
  }

  /**
   * One order per line: name, date, amount. Accepts ";" or tab as separator
   * (so "48,50" can be a decimal), otherwise ",".
   * Returns { orders, errors: [{ line, reason }] }; a header row is skipped silently.
   */
  function parseOrders(text, today) {
    const orders = [], errors = [];
    text.split(/\r?\n/).forEach((line, i) => {
      if (!line.trim()) return;
      const sep = line.includes(';') ? ';' : line.includes('\t') ? '\t' : ',';
      const [name = '', date = '', ...rest] = line.split(sep);
      const amountRaw = sep === ',' ? rest.join('.') : rest.join(sep);
      const t = parseDate(date);
      if (!t && i === 0) return; // header
      if (!name.trim()) return errors.push({ line: i + 1, reason: 'name' });
      if (!t) return errors.push({ line: i + 1, reason: 'date' });
      if (t > today) return errors.push({ line: i + 1, reason: 'future' });
      const amount = parseAmount(amountRaw);
      if (amount === null) return errors.push({ line: i + 1, reason: 'amount' });
      orders.push({ name: name.trim().replace(/\s+/g, ' '), date: t, amount });
    });
    return { orders, errors };
  }

  const median = (xs) => {
    const s = [...xs].sort((a, b) => a - b), mid = s.length >> 1;
    return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
  };

  /** 1–3 by rank: bottom, middle and top third of the list. */
  function terciles(customers, key) {
    const sorted = [...customers].sort((a, b) => a[key] - b[key]);
    const n = sorted.length;
    const score = new Map();
    sorted.forEach((c, i) => score.set(c, n === 1 ? 2 : 1 + Math.floor((i * 3) / n)));
    // Ties share the highest score reached by their value.
    const best = new Map();
    sorted.forEach((c) => best.set(c[key], Math.max(best.get(c[key]) || 0, score.get(c))));
    return (c) => best.get(c[key]);
  }

  function analyse(orders, today) {
    const byName = new Map();
    for (const o of orders) {
      const k = o.name.toLocaleLowerCase();
      if (!byName.has(k)) byName.set(k, { name: o.name, dates: [], spend: 0 });
      const c = byName.get(k);
      c.dates.push(o.date);
      c.spend += o.amount;
    }

    const customers = [...byName.values()].map((c) => {
      const dates = [...new Set(c.dates)].sort((a, b) => a - b);
      const gaps = dates.slice(1).map((d, i) => Math.round((d - dates[i]) / DAY));
      const last = dates[dates.length - 1];
      const recency = Math.round((today - last) / DAY);
      const usual = gaps.length ? Math.max(1, Math.round(median(gaps))) : null;
      let status;
      if (!usual) status = recency <= NEW_DAYS ? 'new' : 'oneoff';
      else if (recency <= usual * MISSED) status = 'rhythm';
      else if (recency <= usual * DORMANT) status = 'missed';
      else status = 'dormant';
      return { name: c.name, first: c.name.split(' ')[0], orders: c.dates.length, frequency: c.dates.length, spend: c.spend, recency, negRecency: -recency, usual, status };
    });

    const r = terciles(customers, 'negRecency'), f = terciles(customers, 'frequency'), m = terciles(customers, 'spend');
    for (const c of customers) {
      c.rfv = { r: r(c), f: f(c), v: m(c) };
      c.highValue = c.rfv.f === 3 && c.rfv.v === 3;
      c.action = {
        missed: c.highValue ? 'personal' : 'usual',
        oneoff: 'second',
        new: 'welcome',
        dormant: 'rest',
        rhythm: 'none',
      }[c.status];
    }

    customers.sort((a, b) => PRIORITY.indexOf(a.action) - PRIORITY.indexOf(b.action) || b.spend - a.spend);
    return customers;
  }

  /** The three-line Monday report: who to contact, who went quiet, who is fine. */
  function report(customers) {
    const contact = customers.filter((c) => ['personal', 'usual', 'second', 'welcome'].includes(c.action));
    return {
      contact: contact.map((c) => c.name),
      quiet: customers.filter((c) => c.action === 'rest').map((c) => c.name),
      rhythm: customers.filter((c) => c.action === 'none').length,
    };
  }

  /** Example bakery orders, relative to today so the demo always reads the same. */
  function exampleOrders(today) {
    const people = [
      // name, usual interval, orders, days since last, avg amount
      ['Ana Souza', 9, 8, 14, 48],
      ['Jorge Lima', 7, 9, 16, 31],
      ['Marina Reis', 20, 3, 33, 22],
      ['Carla Mendes', 10, 6, 4, 27],
      ['Pedro Alves', 6, 10, 3, 19],
      ['Tiago Ramos', 14, 5, 10, 36],
      ['Lúcia Prado', 0, 1, 5, 24],
      ['Sofia Lima', 0, 1, 12, 17],
      ['Rafael Costa', 0, 1, 45, 29],
      ['Beatriz Nunes', 12, 4, 60, 33],
    ];
    const rows = [];
    people.forEach(([name, every, count, since, avg], p) => {
      for (let k = 0; k < count; k++) {
        // Every third order lands a day late, so the median stays at `every`.
        const jitter = every && k % 3 === 2 ? 1 : 0;
        const t = today - (since + k * every + jitter) * DAY;
        rows.push({ name, date: t, amount: Math.round(avg * (0.85 + ((p * 7 + k * 3) % 10) / 33)) });
      }
    });
    return rows.sort((a, b) => a.date - b.date);
  }

  function todayUTC() {
    const n = new Date();
    return utcDay(n.getFullYear(), n.getMonth() + 1, n.getDate());
  }

  root.Gina = { parseOrders, analyse, report, exampleOrders, todayUTC, DAY };
})(typeof window !== 'undefined' ? window : globalThis);
