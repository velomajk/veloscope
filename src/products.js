// Single source of truth for the product portfolio.
// The home grid, nav dropdown, footer, docs switcher, and search index
// all iterate over this list — adding a product here surfaces it everywhere.

export const MARKETPLACE_URL = 'https://marketplace.atlassian.com/apps/1713935368';

export const PRODUCTS = [
  {
    id: 'edf',
    name: 'Epic Delivery Forecast',
    mono: 'EDF',
    status: 'Live',
    statusKind: 'ok', // ok | warn
    menuDesc: 'Epics into delivery timelines, in seconds',
    url: '/products/edf.html',
    docsUrl: '/documentation.html',
    marketplace: MARKETPLACE_URL,
    // monogram + tile gradient (deep -> light, 135deg)
    g1: '#0ea5e9',
    g2: '#38bdf8',
    searchIcon: 'E',
  },
  {
    id: 'kup',
    name: 'KUP Compliance Reporter',
    mono: 'KUP',
    status: 'Coming soon',
    statusKind: 'warn',
    menuDesc: 'Creative-work hours, approvals, payroll',
    url: '/products/kup.html',
    docsUrl: '/documentation.html',
    marketplace: null,
    logo: '/assets/kup-icon.svg',
    g1: '#7c3aed',
    g2: '#a78bfa',
    searchIcon: 'K',
  },
];

// Static docs entries for the ⌘K index. Until the markdown-driven docs space
// ships (second pass), these point at the existing documentation page.
export const DOCS_SEARCH = [
  { title: 'Configuration guide', crumb: 'Docs / Epic Delivery Forecast', icon: 'E', url: '/documentation.html?product=edf&page=configuration-guide' },
  { title: 'How to read the report', crumb: 'Docs / Epic Delivery Forecast', icon: 'E', url: '/documentation.html?product=edf&page=reading-the-report' },
  { title: 'Troubleshooting', crumb: 'Docs / Epic Delivery Forecast', icon: 'E', url: '/documentation.html?product=edf&page=troubleshooting' },
  { title: 'Key concepts', crumb: 'Docs / KUP Compliance Reporter', icon: 'K', url: '/documentation.html?product=kup&page=key-concepts' },
  { title: 'Administrator guide', crumb: 'Docs / KUP Compliance Reporter', icon: 'K', url: '/documentation.html?product=kup&page=administrator-guide' },
  { title: 'Manager guide', crumb: 'Docs / KUP Compliance Reporter', icon: 'K', url: '/documentation.html?product=kup&page=manager-guide' },
  { title: 'Employee guide', crumb: 'Docs / KUP Compliance Reporter', icon: 'K', url: '/documentation.html?product=kup&page=employee-guide' },
];

export function tileBackground(icon) {
  if (icon === 'E') return 'linear-gradient(135deg, #0ea5e9, #38bdf8)';
  if (icon === 'K') return 'linear-gradient(135deg, #7c3aed, #a78bfa)';
  return 'var(--glass-bg)';
}
