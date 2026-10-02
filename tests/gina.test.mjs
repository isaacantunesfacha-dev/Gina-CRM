// Gina · CRM Strategy — rules engine tests
// © 2026 Isaac Antunes. All rights reserved.
//
// Run with: node --test tests/
// js/gina.js is a browser script; loading it here attaches Gina to globalThis.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import '../js/gina.js';

const { parseOrders, analyse, report, exampleOrders, DAY } = globalThis.Gina;

const TODAY = Date.UTC(2026, 9, 2); // 2026-10-02
const ago = (n) => TODAY - n * DAY;
const iso = (t) => new Date(t).toISOString().slice(0, 10);
const order = (name, daysAgo, amount = 10) => ({ name, date: ago(daysAgo), amount });
/** One customer with `count` orders every `every` days, the last `since` days ago. */
const regular = (name, every, count, since, amount = 10) =>
  Array.from({ length: count }, (_, k) => order(name, since + k * every, amount));
const byName = (customers) => Object.fromEntries(customers.map((c) => [c.name, c]));

// ── parseOrders ──────────────────────────────────────────

test('parses ISO and day/month/year dates', () => {
  const { orders, errors } = parseOrders('Ana, 2026-09-30, 48\nJorge; 30/09/2026; 31', TODAY);
  assert.deepEqual(errors, []);
  assert.equal(orders.length, 2);
  assert.equal(iso(orders[0].date), '2026-09-30');
  assert.equal(iso(orders[1].date), '2026-09-30');
});

test('reads decimal comma and decimal point amounts', () => {
  const { orders } = parseOrders([
    'Ana; 2026-09-01; 48,50',
    'Ana; 2026-09-02; 1.234,50',
    'Ana, 2026-09-03, 48.50',
    'Ana, 2026-09-04, 48,50',
    'Ana\t2026-09-05\t12',
  ].join('\n'), TODAY);
  assert.deepEqual(orders.map((o) => o.amount), [48.5, 1234.5, 48.5, 48.5, 12]);
});

test('rejects impossible and future dates, missing names and amounts', () => {
  const { orders, errors } = parseOrders([
    'Ana, 2026-09-01, 10',
    'Ana, 31/02/2026, 10',
    'Ana, 2026-10-03, 10',
    ', 2026-09-01, 10',
    'Ana, 2026-09-01,',
  ].join('\n'), TODAY);
  assert.equal(orders.length, 1);
  assert.deepEqual(errors, [
    { line: 2, reason: 'date' },
    { line: 3, reason: 'future' },
    { line: 4, reason: 'name' },
    { line: 5, reason: 'amount' },
  ]);
});

test('rejects negative amounts', () => {
  const { errors } = parseOrders('Ana, 2026-09-01, -10', TODAY);
  assert.deepEqual(errors, [{ line: 1, reason: 'amount' }]);
});

test('skips a header row and blank lines', () => {
  const { orders, errors } = parseOrders('name, date, amount\n\nAna, 2026-09-01, 10\n', TODAY);
  assert.deepEqual(errors, []);
  assert.equal(orders.length, 1);
});

test('today counts as a valid date', () => {
  const { orders } = parseOrders('Ana, 2026-10-02, 10', TODAY);
  assert.equal(orders.length, 1);
});

test('collapses spaces in names', () => {
  const { orders } = parseOrders('  Ana   Souza , 2026-09-01, 10', TODAY);
  assert.equal(orders[0].name, 'Ana Souza');
});

// ── analyse: rhythm and status ───────────────────────────

test('usual rhythm is the median gap between distinct order days', () => {
  const [c] = analyse([order('Ana', 0), order('Ana', 7), order('Ana', 14), order('Ana', 30)], TODAY);
  assert.equal(c.usual, 7);
});

test('status boundaries: 1.5× rhythm is still on rhythm, 3× is still missed', () => {
  const at = (since) => analyse(regular('Ana', 10, 4, since), TODAY)[0].status;
  assert.equal(at(15), 'rhythm');
  assert.equal(at(16), 'missed');
  assert.equal(at(30), 'missed');
  assert.equal(at(31), 'dormant');
});

test('one order: new up to 30 days, then one-off', () => {
  assert.equal(analyse([order('Ana', 30)], TODAY)[0].status, 'new');
  assert.equal(analyse([order('Ana', 31)], TODAY)[0].status, 'oneoff');
});

test('gaps across month ends are counted in calendar days', () => {
  const orders = parseOrders('Ana, 2026-01-31, 10\nAna, 2026-03-01, 10', TODAY).orders;
  assert.equal(analyse(orders, TODAY)[0].usual, 29);
});

test('frequency counts every order, rhythm ignores same-day repeats', () => {
  const [c] = analyse([order('Ana', 0), order('Ana', 0), order('Ana', 10)], TODAY);
  assert.equal(c.frequency, 3);
  assert.equal(c.usual, 10);
});

test('groups orders by name, ignoring case', () => {
  const customers = analyse([order('Ana Souza', 1), order('ana souza', 5)], TODAY);
  assert.equal(customers.length, 1);
  assert.equal(customers[0].orders, 2);
});

// ── analyse: RFV thirds ──────────────────────────────────

test('RFV thirds on small lists', () => {
  const scores = (n) => analyse(Array.from({ length: n }, (_, i) => order(`C${i}`, 40, (i + 1) * 10)), TODAY)
    .sort((a, b) => a.spend - b.spend).map((c) => c.rfv.v);
  assert.deepEqual(scores(1), [2]);
  assert.deepEqual(scores(2), [1, 2]);
  assert.deepEqual(scores(3), [1, 2, 3]);
  assert.deepEqual(scores(4), [1, 1, 2, 3]);
});

test('tied values share the highest score their value reaches', () => {
  const customers = analyse(['A', 'B', 'C', 'D'].map((n) => order(n, 40, 10)), TODAY);
  assert.deepEqual(customers.map((c) => c.rfv.v), [3, 3, 3, 3]);
});

test('high value needs the top third in both frequency and spend', () => {
  const orders = [
    ...regular('Top', 7, 6, 20, 50),
    ...regular('Busy', 7, 6, 20, 5),
    ...regular('Mid', 7, 3, 20, 20),
  ];
  const c = byName(analyse(orders, TODAY));
  assert.equal(c.Top.highValue, true);
  assert.equal(c.Top.action, 'personal');
  assert.equal(c.Busy.highValue, false);
  assert.equal(c.Busy.action, 'usual');
});

// ── actions and report ───────────────────────────────────

test('example bakery: actions, order and Monday report', () => {
  const customers = analyse(exampleOrders(TODAY), TODAY);
  assert.deepEqual(customers.map((c) => [c.name, c.status, c.action]), [
    ['Ana Souza', 'missed', 'personal'],
    ['Jorge Lima', 'missed', 'personal'],
    ['Marina Reis', 'missed', 'usual'],
    ['Rafael Costa', 'oneoff', 'second'],
    ['Lúcia Prado', 'new', 'welcome'],
    ['Sofia Lima', 'new', 'welcome'],
    ['Beatriz Nunes', 'dormant', 'rest'],
    ['Pedro Alves', 'rhythm', 'none'],
    ['Tiago Ramos', 'rhythm', 'none'],
    ['Carla Mendes', 'rhythm', 'none'],
  ]);
  assert.deepEqual(report(customers), {
    contact: ['Ana Souza', 'Jorge Lima', 'Marina Reis', 'Rafael Costa', 'Lúcia Prado', 'Sofia Lima'],
    quiet: ['Beatriz Nunes'],
    rhythm: 3,
  });
});

test('example bakery keeps each customer\'s rhythm', () => {
  const c = byName(analyse(exampleOrders(TODAY), TODAY));
  assert.equal(c['Ana Souza'].usual, 9);
  assert.equal(c['Jorge Lima'].usual, 7);
  assert.equal(c['Lúcia Prado'].usual, null);
});
