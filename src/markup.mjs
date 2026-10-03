// Gina · CRM Strategy — shared markup (site page and Behance modules)
// © 2026 Isaac Antunes. All rights reserved.

export const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const pad = (i) => String(i + 1).padStart(2, '0');
export const each = (list, fn) => list.map(fn).join('');

// Branded channel pieces sent by the fictional shop, in journey order:
// email, newsletter, push, SMS, story. `mk` is the copy's `mk` block.
export const channelMocks = (mk) => [
  `<div class="mock mock--email" aria-hidden="true">
          <div class="mock__head"><strong>${esc(mk.shop)}</strong><span>${esc(mk.emSubj)}</span></div>
          <div class="mock__hero"><p class="mock__k">${esc(mk.shop)}</p><p>${esc(mk.emHead)}</p></div>
          <div class="mock__body"><span>${esc(mk.emBody)}</span><span class="mock__cta">${esc(mk.emCta)}</span><span class="mock__by">${esc(mk.by)}</span></div>
        </div>`,
  `<div class="mock mock--news" aria-hidden="true">
          <div class="mock__mast"><span>${esc(mk.nlEd)}</span><span>${esc(mk.nlNo)}</span></div>
          <div class="mock__img">${esc(mk.nlTag)}</div>
          <span class="mock__title">${esc(mk.nlTitle)}</span>
          <span class="mock__text">${esc(mk.nlBody)}</span>
          <span class="mock__by">${esc(mk.shop)} · ${esc(mk.by)}</span>
        </div>`,
  `<div class="mock mock--push" aria-hidden="true">
          <span class="mock__day">${esc(mk.puDay)}</span>
          <span class="mock__time">${esc(mk.puTime)}</span>
          <div class="mock__note">
            <span class="mock__logo">F</span>
            <div><strong>${esc(mk.shop)}</strong><span>${esc(mk.puTitle)}</span><span>${esc(mk.puBody)}</span></div>
          </div>
        </div>`,
  `<div class="mock mock--sms" aria-hidden="true">
          <div class="mock__head"><span class="mock__logo">F</span><span>${esc(mk.shop)}</span></div>
          <div class="mock__thread">
            <span class="mock__stamp">${esc(mk.smTime)}</span>
            <span class="bubble-in">${esc(mk.smBody)}</span>
            <span class="bubble-out">1</span>
          </div>
        </div>`,
  `<div class="mock mock--story" aria-hidden="true">
          <div class="mock__bars"><span></span><span></span><span></span></div>
          <div class="mock__who"><span class="mock__logo">F</span><span>${esc(mk.shop)}</span></div>
          <span class="mock__k">${esc(mk.stK)}</span>
          <span class="mock__quote">${esc(mk.stQuote)}</span>
          <div class="mock__poll"><strong>${esc(mk.stQ)}</strong><div><span>${esc(mk.stA)}</span><span>${esc(mk.stB)}</span></div></div>
        </div>`,
];

// Three phone screens of the mobile-first product: owner push, owner home,
// customer chat. `m` is the copy's `mob` block, `asset` resolves asset paths.
export const phoneScreens = (m, asset) => [
  `<div class="phone"><div class="phone__screen screen-lock">
          <p class="screen-lock__day">${esc(m.day)}</p>
          <p class="screen-lock__time">8:41</p>
          <div class="push">
            <div class="push__app"><img src="${asset('assets/gina-flat.webp')}" alt="" loading="lazy"><span>Gina</span><span>${esc(m.now)}</span></div>
            <p class="push__t">${esc(m.pushT)}</p>
            <p class="push__b">${esc(m.pushB)}</p>
            <div class="push__actions"><span>${esc(m.pushA)}</span><span>${esc(m.pushL)}</span></div>
          </div>
        </div></div>`,
  `<div class="phone"><div class="phone__screen screen-home">
          <p class="screen-home__hello">${esc(m.hello)}</p>
          <p class="screen-home__title">${esc(m.homeA)} <span class="em">${esc(m.homeI)}</span></p>
          <ul class="risk">${each(m.items, (it) => `
            <li><span class="risk__avatar">${esc(it.i)}</span><div class="risk__who"><p>${esc(it.n)}</p><p>${esc(it.s)}</p></div><span class="risk__action">${esc(it.a)}</span></li>`)}
          </ul>
          <p class="screen-home__prog">${esc(m.prog)}</p>
          <div class="progress"><span></span></div>
          <div class="screen-home__primary">${esc(m.primary)}</div>
          <div class="tabbar"><span>${esc(m.tab1)}</span><span>${esc(m.tab2)}</span><span>Gina</span></div>
        </div></div>`,
  `<div class="phone"><div class="phone__screen screen-chat">
          <div class="screen-chat__bar"><span>DL</span><div><p>${esc(m.shop)}</p><p>${esc(m.biz)}</p></div></div>
          <div class="screen-chat__thread">
            <p class="msg-in">${esc(m.b1)}</p>
            <div class="quick"><span>${esc(m.q1)}</span><span>${esc(m.q2)}</span></div>
            <p class="msg-out">${esc(m.b2)}</p>
            <p class="msg-in">${esc(m.b3)}</p>
          </div>
        </div></div>`,
];

// Caption keys per phone, in the same order as phoneScreens.
export const PHONE_CAPTIONS = [['s1k', 's1t', 's1d'], ['s2k', 's2t', 's2d'], ['s3k', 's3t', 's3d']];

// Win-back journey as three columns: trigger/branch, high-value/standard, goal/exit.
// `wf` is the copy's `wf` block, `asset` resolves asset paths.
export const winbackFlow = (wf, asset) => `<div class="grid flow">
      <div class="flow__col">
        <p class="label">${esc(wf.trig)}</p>
        <div class="node node--dark node--big"><p>${esc(wf.trigT)}</p><p class="node__code">event: days_since_order &gt; usual_interval × 1.5</p></div>
        <p class="label">${esc(wf.branch)}</p>
        <div class="node node--light node--big"><p>${esc(wf.branchT)}</p></div>
      </div>
      <div class="flow__col">
        <p class="label label--accent">${esc(wf.yes)}</p>
        <div class="node node--light node--stack"><p>${esc(wf.y1)}</p><p class="node__wait">${esc(wf.w7)}</p><p>${esc(wf.y2)}</p></div>
        <p class="label label--accent">${esc(wf.no)}</p>
        <div class="node node--light node--stack"><p>${esc(wf.n1)}</p><p class="node__wait">${esc(wf.w5)}</p><p>${esc(wf.n2)}</p></div>
      </div>
      <div class="flow__col">
        <p class="label">${esc(wf.goal)}</p>
        <div class="node node--signal node--big"><p>${esc(wf.goalT)}</p></div>
        <p class="label">${esc(wf.exit)}</p>
        <div class="node node--light"><p>${esc(wf.exitT)}</p></div>
        <div class="flow__run"><img src="${asset('assets/gina-flat.webp')}" alt="" width="64" height="75" loading="lazy"><p>${esc(wf.run)}</p></div>
      </div>
    </div>`;

/**
 * The three problems, each answered on the same row: problem, arrow, what I do,
 * and where it was done for real. "Who: what" proofs split at the first colon,
 * so the place can stand out; a proof without a place stays plain text.
 */
export function problemRows(t) {
  const proof = (text) => {
    const i = text.indexOf(': ');
    return i < 0 ? esc(text) : `<b>${esc(text.slice(0, i))}</b> ${esc(text.slice(i + 2))}`;
  };
  return `<ol class="fixes">${each(t.breaks, (b) => `
    <li class="fix">
      <div class="fix__problem">
        <span class="fix__k">${b.k}</span>
        <h3 class="fix__t">${esc(b.a)} <span class="em">${esc(b.i)}</span></h3>
        <p class="fix__d">${esc(b.d)}</p>
      </div>
      <span class="fix__arrow" aria-hidden="true"></span>
      <div class="fix__answer">
        <p class="fix__label">${esc(t.breakFixK)}</p>
        <p class="fix__a">${esc(b.fix)}</p>
        <p class="fix__proof"><span>${esc(t.breakProofK)}</span> ${proof(b.proof)}</p>
      </div>
    </li>`)}
  </ol>`;
}
