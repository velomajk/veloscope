// Shared site chrome for the redesigned pages.
// Injects the sticky navbar, footer, and ⌘K search modal into every page that
// includes a `.vs-app` shell, then wires the interactions (theme toggle,
// Products dropdown, mobile drawer, global search). A small amount of vanilla
// JS — the markup itself is plain static HTML built from the product list.

import { PRODUCTS, DOCS_SEARCH, MARKETPLACE_URL, tileBackground } from './products.js';
// Import the brand mark so Vite resolves it to a hashed URL that exists in both
// dev and the production build (a runtime string path would 404 after build).
import veloIcon from './assets/veloscope-icon.svg';

/* ───────────────────────── theme ───────────────────────── */
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light') {
    root.classList.add('light-theme');
    root.classList.remove('dark-theme');
  } else {
    root.classList.add('dark-theme');
    root.classList.remove('light-theme');
  }
  try { localStorage.setItem('theme', theme); } catch (e) {}
  updateThemeIcon(theme);
}

function currentTheme() {
  if (document.documentElement.classList.contains('light-theme')) return 'light';
  if (document.documentElement.classList.contains('dark-theme')) return 'dark';
  try {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
  } catch (e) {}
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function updateThemeIcon(theme) {
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.textContent = theme === 'light' ? '☀' : '☾';
  });
}

/* ───────────────────────── markup ───────────────────────── */
function badgeClass(kind) {
  return kind === 'ok' ? 'vs-badge-ok' : 'vs-badge-warn';
}

function productMark(p, size) {
  if (p.logo) {
    return `<img class="vs-product-mark vs-product-mark-${size}" src="${p.logo}" alt="" aria-hidden="true">`;
  }
  return `<div class="vs-mono vs-mono-${size}" style="--g1:${p.g1};--g2:${p.g2}">${p.mono}</div>`;
}

function navMarkup() {
  const productLinks = PRODUCTS.map((p) => `
    <a class="vs-product-link" href="${p.url}">
      ${productMark(p, 40)}
      <div class="vs-pl-text">
        <span class="vs-pl-name">${p.name}
          <span class="vs-badge vs-badge-sm ${badgeClass(p.statusKind)}">${p.status}</span>
        </span>
        <span class="vs-pl-desc">${p.menuDesc}</span>
      </div>
    </a>`).join('');

  const drawerProducts = PRODUCTS.map(
    (p) => `<a class="vs-drawer-link" href="${p.url}">${p.name}</a>`
  ).join('');

  return `
  <nav class="vs-nav">
    <div class="vs-nav-inner">
      <a class="vs-logo" href="/index.html" aria-label="Veloscope home">
        <img src="${veloIcon}" alt="Veloscope">
        <span>Veloscope</span>
      </a>
      <div class="vs-nav-center">
        <button class="vs-nav-link" data-products-btn aria-haspopup="true" aria-expanded="false">Products <span class="vs-caret">▾</span></button>
        <a class="vs-nav-link" href="/documentation.html">Docs</a>
        <a class="vs-nav-link" href="/blog.html">Blog</a>
        <div class="vs-products-menu" data-products-menu hidden>${productLinks}</div>
      </div>
      <div class="vs-nav-actions">
        <button class="vs-search-pill" data-search-open><span>Search docs…</span><span class="vs-kbd">⌘K</span></button>
        <button class="vs-theme-toggle" data-theme-toggle aria-label="Toggle theme">☾</button>
        <a class="vs-cta" href="${MARKETPLACE_URL}" target="_blank" rel="noopener">Atlassian Marketplace</a>
        <button class="vs-menu-btn" data-drawer-toggle aria-label="Menu" aria-expanded="false">☰</button>
      </div>
    </div>
    <div class="vs-drawer" data-drawer hidden>
      <a class="vs-drawer-link is-home" href="/index.html">Home</a>
      ${drawerProducts}
      <a class="vs-drawer-link" href="/documentation.html">Docs</a>
      <a class="vs-drawer-link" href="/blog.html">Blog</a>
      <button class="vs-drawer-link" data-search-open style="text-align:left;background:none;border:none;font-family:inherit;">Search ⌘K</button>
      <a class="vs-drawer-cta" href="${MARKETPLACE_URL}" target="_blank" rel="noopener">Atlassian Marketplace</a>
    </div>
  </nav>`;
}

function footerMarkup() {
  const productLinks = PRODUCTS.map(
    (p) => `<a href="${p.url}">${p.name}</a>`
  ).join('');
  return `
  <footer class="vs-footer">
    <div class="vs-footer-inner">
      <div class="vs-footer-brand">
        <div class="vs-footer-logo"><img src="${veloIcon}" alt="Veloscope"><span>Veloscope</span></div>
        <span class="vs-footer-tag">Focused apps for Atlassian Jira.<br>© 2026 Veloscope. All rights reserved.</span>
      </div>
      <div class="vs-footer-col">
        <h4>Products</h4>
        ${productLinks}
        <a href="${MARKETPLACE_URL}" target="_blank" rel="noopener">Atlassian Marketplace ↗</a>
      </div>
      <div class="vs-footer-col">
        <h4>Resources</h4>
        <a href="/documentation.html">Documentation</a>
        <a href="/blog.html">Blog</a>
        <a href="/services.html">Services &amp; Support</a>
      </div>
      <div class="vs-footer-col">
        <h4>Legal</h4>
        <a href="/privacy.html">Privacy Policy</a>
        <a href="/security.html">Security Policy</a>
        <a href="/contact.html">Contact</a>
      </div>
    </div>
  </footer>`;
}

function searchMarkup() {
  return `
  <div class="vs-search-overlay" data-search-overlay hidden>
    <div class="vs-search-panel" data-search-panel>
      <div class="vs-search-head">
        <span class="vs-search-icon">⌕</span>
        <input class="vs-search-input" data-search-input placeholder="Search docs, products, and blog…" autocomplete="off" spellcheck="false">
        <span class="vs-esc" data-search-close>ESC</span>
      </div>
      <div class="vs-search-results" data-search-results></div>
    </div>
  </div>`;
}

/* ───────────────────────── search index ───────────────────────── */
function buildBaseIndex() {
  const products = PRODUCTS.map((p) => ({
    title: p.name,
    crumb: 'Products',
    kind: 'Product',
    icon: p.searchIcon,
    url: p.url,
  }));
  const docs = DOCS_SEARCH.map((d) => ({
    title: d.title,
    crumb: d.crumb,
    kind: 'Docs',
    icon: d.icon,
    url: d.url,
  }));
  return [...docs, ...products];
}

let SEARCH_INDEX = buildBaseIndex();

function loadBlogIntoIndex() {
  fetch('/blog/posts.json')
    .then((r) => (r.ok ? r.json() : []))
    .then((posts) => {
      const blogEntries = posts.map((p) => ({
        title: p.title,
        crumb: `Blog · ${formatDate(p.date)}`,
        kind: 'Blog',
        icon: '✎',
        url: `/blog/${p.id}/`,
      }));
      SEARCH_INDEX = [...SEARCH_INDEX, ...blogEntries];
    })
    .catch(() => {});
}

function formatDate(iso) {
  // posts.json uses YYYY-MM-DD; show a friendly form, fall back to raw.
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ───────────────────────── wiring ───────────────────────── */
function init() {
  const app = document.querySelector('.vs-app') || document.getElementById('app');
  if (!app) return;

  // inject chrome
  app.insertAdjacentHTML('afterbegin', navMarkup());
  app.insertAdjacentHTML('beforeend', footerMarkup());
  document.body.insertAdjacentHTML('beforeend', searchMarkup());

  updateThemeIcon(currentTheme());
  loadBlogIntoIndex();

  const productsBtn = app.querySelector('[data-products-btn]');
  const productsMenu = app.querySelector('[data-products-menu]');
  const drawer = app.querySelector('[data-drawer]');
  const drawerToggle = app.querySelector('[data-drawer-toggle]');
  const overlay = document.querySelector('[data-search-overlay]');
  const searchInput = overlay.querySelector('[data-search-input]');
  const resultsEl = overlay.querySelector('[data-search-results]');

  let activeResult = 0;
  let currentResults = [];

  /* products dropdown */
  function setProductsMenu(open) {
    productsMenu.hidden = !open;
    productsBtn.setAttribute('aria-expanded', String(open));
  }
  productsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setProductsMenu(productsMenu.hidden);
  });
  document.addEventListener('click', (e) => {
    if (!productsMenu.hidden && !productsMenu.contains(e.target) && e.target !== productsBtn) {
      setProductsMenu(false);
    }
  });

  /* mobile drawer */
  function setDrawer(open) {
    drawer.hidden = !open;
    drawerToggle.setAttribute('aria-expanded', String(open));
  }
  drawerToggle.addEventListener('click', () => setDrawer(drawer.hidden));

  /* theme toggle (delegated — buttons live in nav + drawer) */
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-theme-toggle]')) {
      applyTheme(currentTheme() === 'light' ? 'dark' : 'light');
    }
  });

  /* search */
  function renderResults(query) {
    const q = query.trim().toLowerCase();
    currentResults = q
      ? SEARCH_INDEX.filter((r) => (r.title + ' ' + r.crumb).toLowerCase().includes(q))
      : SEARCH_INDEX.slice(0, 6);
    activeResult = 0;

    if (currentResults.length === 0) {
      resultsEl.innerHTML = `<div class="vs-search-empty">No results for “${escapeHtml(query)}”</div>`;
      return;
    }
    resultsEl.innerHTML = currentResults
      .map((r, i) => {
        const tileColor = r.icon === '✎' ? 'var(--text-secondary)' : '#fff';
        return `
        <a class="vs-search-result${i === 0 ? ' is-active' : ''}" href="${r.url}" data-idx="${i}">
          <span class="vs-search-tile" style="background:${tileBackground(r.icon)};color:${tileColor}">${r.icon}</span>
          <span class="vs-search-meta">
            <span class="vs-search-title">${escapeHtml(r.title)}</span>
            <span class="vs-search-crumb">${escapeHtml(r.crumb)}</span>
          </span>
          <span class="vs-search-kind">${r.kind}</span>
        </a>`;
      })
      .join('');
  }

  function highlightActive() {
    const items = resultsEl.querySelectorAll('.vs-search-result');
    items.forEach((el, i) => el.classList.toggle('is-active', i === activeResult));
    const active = items[activeResult];
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  function openSearch() {
    setProductsMenu(false);
    setDrawer(false);
    overlay.hidden = false;
    searchInput.value = '';
    renderResults('');
    requestAnimationFrame(() => searchInput.focus());
  }
  function closeSearch() {
    overlay.hidden = true;
  }

  document.querySelectorAll('[data-search-open]').forEach((b) =>
    b.addEventListener('click', openSearch)
  );
  overlay.querySelector('[data-search-close]').addEventListener('click', closeSearch);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });
  searchInput.addEventListener('input', () => renderResults(searchInput.value));
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeResult = Math.min(activeResult + 1, currentResults.length - 1);
      highlightActive();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeResult = Math.max(activeResult - 1, 0);
      highlightActive();
    } else if (e.key === 'Enter') {
      const target = currentResults[activeResult];
      if (target) window.location.href = target.url;
    }
  });

  /* global keyboard */
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      openSearch();
    } else if (e.key === 'Escape') {
      closeSearch();
      setDrawer(false);
      setProductsMenu(false);
    }
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
