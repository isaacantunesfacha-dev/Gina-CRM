/*
 * Gina · CRM Strategy — where did the contact come from?
 * © 2026 Isaac Antunes. All rights reserved.
 *
 * A link like /gina-crm/?ref=behance adds "(behance)" to the subject of the
 * page's mailto links, so an e-mail tells where it came from. No tracking:
 * nothing is stored or sent, and only the listed sources are accepted.
 */
(function () {
  'use strict';

  const SOURCES = ['behance', 'linkedin', 'post', 'cv'];
  const ref = (new URLSearchParams(location.search).get('ref') || '').toLowerCase();
  if (!SOURCES.includes(ref)) return;

  document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
    a.href = a.getAttribute('href').replace(/(subject=[^&]*)/, '$1' + encodeURIComponent(` (${ref})`));
  });
})();
