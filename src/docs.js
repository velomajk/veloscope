// Documentation article shell.
// Reads /docs/index.json to build the product switcher + section tree, fetches
// the selected article's markdown, renders it with `marked`, then enhances the
// output into the styled doc components (callouts, code blocks with copy,
// screenshot frames, tables, numbered steps) and builds the right-hand TOC.
//
// Deep links: documentation.html?product=<id>&page=<slug>[#heading]

import { marked } from 'marked';

const KIND_ICON = { info: 'ⓘ', warning: '⚠', tip: '✦' };
const HEADER_OFFSET = 110;

const state = {
  products: [],
  productId: 'edf',
  sectionSlug: null,
  expanded: {},
  headings: [],
  activeHeading: null,
};

const els = {};

/* ───────────── helpers ───────────── */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);
}
function slugify(s) {
  return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
function product() { return state.products.find((p) => p.id === state.productId) || state.products[0]; }
function sections() { return product() ? product().sections : []; }
function currentSection() {
  return sections().find((s) => s.slug === state.sectionSlug) || sections()[0];
}

/* ───────────── markdown → callouts preprocessing ───────────── */
function preprocessCallouts(md) {
  const lines = md.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const m = /^>\s*\[!(info|warning|tip)\]\s*(.*)$/i.exec(lines[i]);
    if (m) {
      const type = m[1].toLowerCase();
      const buf = [m[2]];
      i++;
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      const inner = marked.parseInline(buf.join(' ').trim());
      out.push('');
      out.push(`<div class="vs-callout ${type}"><span class="vs-callout-icon">${KIND_ICON[type]}</span><div class="vs-callout-body"><p>${inner}</p></div></div>`);
      out.push('');
      continue;
    }
    out.push(lines[i]);
    i++;
  }
  return out.join('\n');
}

/* ───────────── enhance rendered HTML into doc components ───────────── */
function enhance(container) {
  // headings → ids (for TOC + anchor scroll)
  const used = {};
  const headings = [];
  container.querySelectorAll('h2').forEach((h) => {
    let id = slugify(h.textContent);
    if (used[id]) { used[id]++; id = `${id}-${used[id]}`; } else { used[id] = 1; }
    h.id = id;
    headings.push({ id, text: h.textContent });
  });
  state.headings = headings;

  // code blocks → filename bar + copy
  container.querySelectorAll('pre').forEach((pre) => {
    const code = pre.querySelector('code');
    let text = (code ? code.textContent : pre.textContent) || '';
    let lang = '';
    if (code) {
      const cls = [...code.classList].find((c) => c.startsWith('language-'));
      if (cls) lang = cls.replace('language-', '');
    }
    let filename = '';
    const linesArr = text.split('\n');
    const fn = linesArr[0] && /^(?:\/\/|#)\s*([\w.\-/]+\.[A-Za-z0-9]+)\s*$/.exec(linesArr[0].trim());
    if (fn) {
      filename = fn[1];
      linesArr.shift();
      text = linesArr.join('\n').replace(/^\n+/, '');
      if (code) code.textContent = text;
    }
    const label = filename || (lang && lang !== 'text' ? lang : 'snippet');
    const wrap = document.createElement('div');
    wrap.className = 'vs-code';
    const bar = document.createElement('div');
    bar.className = 'vs-code-bar';
    bar.innerHTML = `<span class="vs-code-name">${escapeHtml(label)}</span><button class="vs-code-copy" type="button">Copy</button>`;
    pre.replaceWith(wrap);
    wrap.appendChild(bar);
    wrap.appendChild(pre);
    const btn = bar.querySelector('.vs-code-copy');
    btn.addEventListener('click', () => {
      try { navigator.clipboard.writeText(text); } catch (e) {}
      btn.textContent = 'Copied ✓';
      setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
    });
  });

  // images → screenshot frames (theme-swap when a dark/light asset, dashed placeholder otherwise)
  container.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src') || '';
    const alt = img.getAttribute('alt') || '';
    const frame = document.createElement('div');
    frame.className = 'vs-shot-frame';
    const placeholder = () => {
      frame.innerHTML = `<div class="vs-shot-placeholder"><span class="ph-icon">▣</span><span class="ph-label">Screenshot — ${escapeHtml(alt)}</span></div>`;
    };
    if (!src || src === 'placeholder' || src === '#') {
      placeholder();
    } else {
      const m = /^(.*?)(?:dark|light)\.png$/.exec(src);
      if (m) {
        const base = m[1];
        frame.innerHTML = `<img class="theme-dark-only" src="${base}dark.png" alt="${escapeHtml(alt)}"><img class="theme-light-only" src="${base}light.png" alt="${escapeHtml(alt)}">`;
      } else {
        frame.innerHTML = `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}">`;
      }
      // if the asset isn't present yet, degrade to the dashed placeholder
      frame.querySelectorAll('img').forEach((im) => im.addEventListener('error', placeholder));
    }
    img.replaceWith(frame);
  });
}

/* ───────────── rendering ───────────── */
function setAccent() {
  els.root.classList.toggle('kup', state.productId === 'kup');
}

function renderSwitcher(targetSheet) {
  return `
    <div class="vs-docs-switch">
      <span class="vs-docs-switch-label">Product space</span>
      ${state.products.map((p) => `
        <a class="vs-docs-switch-tile${p.id === state.productId ? ' active' : ''}" href="?product=${p.id}&page=${p.sections[0].slug}" data-switch="${p.id}">
          ${p.id === 'kup'
            ? '<img class="vs-product-mark vs-product-mark-28" src="/assets/kup-icon.svg" alt="">'
            : `<span class="vs-mono vs-mono-28" style="--g1:${p.accentDeep};--g2:${p.accent}">${p.mono}</span>`}
          <span class="vs-docs-switch-name">${escapeHtml(p.name)}</span>
        </a>`).join('')}
    </div>`;
}

function renderTree() {
  const cur = currentSection();
  return sections().map((sec) => {
    const isActive = sec.slug === cur.slug;
    const open = state.expanded[sec.slug] ?? isActive;
    const anchors = isActive ? state.headings : [];
    const pagesHtml = open && anchors.length
      ? `<div class="vs-docs-pages">${anchors.map((h) =>
          `<button class="vs-docs-page${state.activeHeading === h.id ? ' active' : ''}" data-anchor="${h.id}">${escapeHtml(h.text)}</button>`
        ).join('')}</div>`
      : '';
    return `
      <div class="vs-docs-sec">
        <button class="vs-docs-sec-head" data-section="${sec.slug}" data-toggle="${sec.slug}">
          ${escapeHtml(sec.title)} <span class="vs-docs-sec-chev">${open ? '▾' : '▸'}</span>
        </button>
        ${pagesHtml}
      </div>`;
  }).join('');
}

function renderSidebar() {
  els.sidebar.innerHTML = renderSwitcher() + `<div class="vs-docs-tree">${renderTree()}</div>`;
}

function renderToc() {
  if (!state.headings.length) { els.toc.innerHTML = ''; return; }
  els.toc.innerHTML = `
    <span class="vs-docs-toc-label">On this page</span>
    <div class="vs-docs-toc-list">
      ${state.headings.map((h) =>
        `<button class="vs-docs-toc-item${state.activeHeading === h.id ? ' active' : ''}" data-anchor="${h.id}">${escapeHtml(h.text)}</button>`
      ).join('')}
    </div>`;
}

function renderMobileBar() {
  els.mobilebar.innerHTML = `<button class="vs-docs-menu-btn" id="docs-sheet-toggle">☰ Docs menu</button><div class="vs-docs-sheet" id="docs-sheet" hidden></div>`;
}
function renderSheet() {
  const sheet = document.getElementById('docs-sheet');
  if (sheet) sheet.innerHTML = renderSwitcher() + `<div class="vs-docs-tree">${renderTree()}</div>`;
}

function pagerCard(sec, dir) {
  if (!sec) return '<span></span>';
  const cls = dir === 'next' ? 'vs-doc-pager-card next' : 'vs-doc-pager-card';
  const arrow = dir === 'next' ? 'Next →' : '← Previous';
  return `<a class="${cls}" href="?product=${state.productId}&page=${sec.slug}" data-section="${sec.slug}">
    <span class="vs-doc-pager-dir">${arrow}</span>
    <span class="vs-doc-pager-label">${escapeHtml(sec.title)}</span>
  </a>`;
}

function renderArticle(html) {
  const p = product();
  const cur = currentSection();
  const idx = sections().findIndex((s) => s.slug === cur.slug);
  const prev = idx > 0 ? sections()[idx - 1] : null;
  const next = idx < sections().length - 1 ? sections()[idx + 1] : null;

  els.article.innerHTML = `
    <div class="vs-doc-crumb">
      <a data-home>Docs</a><span>/</span>
      <span>${escapeHtml(p.name)}</span><span>/</span>
      <span class="current">${escapeHtml(cur.title)}</span>
    </div>
    <div class="vs-doc-inner">
      <span class="vs-doc-eyebrow">${escapeHtml(p.name)}</span>
      <div class="vs-doc-body" id="doc-body">${html}</div>
      <div class="vs-doc-pager">${pagerCard(prev, 'prev')}${pagerCard(next, 'next')}</div>
    </div>`;
  enhance(document.getElementById('doc-body'));
}

/* ───────────── data + navigation ───────────── */
async function loadArticle(scrollTop = true, anchor = null) {
  const p = product();
  const cur = currentSection();
  setAccent();
  els.article.innerHTML = '<div class="vs-doc-inner"><div class="vs-doc-body"><p style="color:var(--text-tertiary)">Loading…</p></div></div>';
  let html = '<p>Article not found.</p>';
  try {
    const res = await fetch(`/docs/${p.id}/${cur.slug}/index.md`);
    if (res.ok) html = marked.parse(preprocessCallouts(await res.text()));
  } catch (e) {}
  renderArticle(html);
  state.activeHeading = state.headings.length ? state.headings[0].id : null;
  renderSidebar();
  renderToc();
  renderSheet();
  document.title = `${currentSection().title} — ${p.name} docs — Veloscope`;
  if (anchor) {
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToHeading(anchor)));
  } else if (scrollTop) {
    window.scrollTo({ top: 0 });
  }
}

function syncUrl() {
  const url = `${location.pathname}?product=${state.productId}&page=${state.sectionSlug}`;
  history.replaceState(null, '', url);
}

function goSection(slug, productId) {
  if (productId && productId !== state.productId) {
    state.productId = productId;
    state.expanded = {};
  }
  state.sectionSlug = slug;
  closeSheet();
  syncUrl();
  loadArticle(true);
}

function scrollToHeading(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
  state.activeHeading = id;
  updateActiveHighlights();
  closeSheet();
}

function updateActiveHighlights() {
  document.querySelectorAll('.vs-docs-toc-item, .vs-docs-page').forEach((b) => {
    b.classList.toggle('active', b.dataset.anchor === state.activeHeading);
  });
}

function onScroll() {
  if (!state.headings.length) return;
  let current = null;
  state.headings.forEach((h) => {
    const el = document.getElementById(h.id);
    if (el && el.getBoundingClientRect().top < 140) current = h.id;
  });
  if (current && current !== state.activeHeading) {
    state.activeHeading = current;
    updateActiveHighlights();
  }
}

function closeSheet() {
  const sheet = document.getElementById('docs-sheet');
  if (sheet) sheet.hidden = true;
}

/* ───────────── events ───────────── */
function wireEvents() {
  els.root.addEventListener('click', (e) => {
    const switchEl = e.target.closest('[data-switch]');
    const toggleEl = e.target.closest('[data-toggle]');
    const sectionEl = e.target.closest('[data-section]');
    const anchorEl = e.target.closest('[data-anchor]');
    const homeEl = e.target.closest('[data-home]');
    const sheetToggle = e.target.closest('#docs-sheet-toggle');

    if (sheetToggle) {
      const sheet = document.getElementById('docs-sheet');
      if (sheet) sheet.hidden = !sheet.hidden;
      return;
    }
    if (switchEl) {
      e.preventDefault();
      goSection(switchEl.getAttribute('href').match(/page=([^&]+)/)[1], switchEl.dataset.switch);
      return;
    }
    if (anchorEl) { e.preventDefault(); scrollToHeading(anchorEl.dataset.anchor); return; }
    if (toggleEl && !sectionEl?.classList.contains('vs-docs-switch-tile')) {
      // section header: if it's the active section just toggle expand, else navigate
      const slug = toggleEl.dataset.toggle;
      if (slug === currentSection().slug) {
        state.expanded[slug] = !(state.expanded[slug] ?? true);
        renderSidebar();
        renderSheet();
      } else {
        e.preventDefault();
        goSection(slug);
      }
      return;
    }
    if (sectionEl) { e.preventDefault(); goSection(sectionEl.dataset.section); return; }
    if (homeEl) { e.preventDefault(); goSection(sections()[0].slug); return; }
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('popstate', readUrlAndLoad);
}

function readUrlAndLoad() {
  const params = new URLSearchParams(location.search);
  const pid = params.get('product');
  if (pid && state.products.some((p) => p.id === pid)) state.productId = pid;
  const page = params.get('page');
  state.sectionSlug = page && sections().some((s) => s.slug === page) ? page : sections()[0].slug;
  const anchor = location.hash ? location.hash.slice(1) : null;
  loadArticle(!anchor, anchor);
}

/* ───────────── init ───────────── */
async function init() {
  els.root = document.getElementById('docs-root');
  els.sidebar = document.getElementById('docs-sidebar');
  els.article = document.getElementById('docs-article');
  els.toc = document.getElementById('docs-toc');
  els.mobilebar = document.getElementById('docs-mobilebar');
  if (!els.root) return;

  try {
    const res = await fetch('/docs/index.json');
    const data = await res.json();
    state.products = data.products || [];
  } catch (e) {
    els.article.innerHTML = '<div class="vs-doc-inner"><div class="vs-doc-body"><p>Unable to load documentation index.</p></div></div>';
    return;
  }
  if (!state.products.length) return;

  renderMobileBar();
  wireEvents();
  readUrlAndLoad();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
