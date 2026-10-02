/*
 * Gina · CRM Strategy — section bar
 * © 2026 Isaac Antunes. All rights reserved.
 *
 * Marks the link of the section on screen (aria-current) and keeps it visible
 * in the bar when the bar scrolls sideways on small screens. Without JS the
 * bar still works as plain anchor links.
 */
(function () {
  'use strict';

  const bar = document.querySelector('[data-jump]');
  if (!bar) return;
  const inner = bar.querySelector('.jump__inner');
  const links = [...bar.querySelectorAll('a[href^="#"]')];
  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const sections = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean);

  function mark(id) {
    links.forEach((a) => a.removeAttribute('aria-current'));
    const link = byId.get(id);
    if (!link) return;
    link.setAttribute('aria-current', 'location');
    const left = link.offsetLeft - (inner.clientWidth - link.offsetWidth) / 2;
    inner.scrollTo({ left: Math.max(0, left), behavior: 'auto' });
  }

  // A section counts as current while it crosses the band just below the bar.
  const seen = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? seen.add(e.target.id) : seen.delete(e.target.id)));
    const current = sections.find((s) => seen.has(s.id));
    mark(current ? current.id : null);
  }, { rootMargin: '-64px 0px -60% 0px' });
  sections.forEach((s) => io.observe(s));
})();
