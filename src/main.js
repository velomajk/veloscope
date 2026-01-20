import { marked } from 'marked';
import './css/style.css'; // Import styles directly here for Vite to bundle

// --- Theme Logic ---

const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Function to set theme
function setTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
  } else {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
  }
  localStorage.setItem('theme', theme);
}

// Function to get current preferred theme
function getPreferredTheme() {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

// Initialize theme
setTheme(getPreferredTheme());

// Event listener for toggle button
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });
}

// Optional: Listen for system preference changes if user hasn't overridden
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'light' : 'dark');
  }
});


// --- Privacy Page Logic ---
const privacyContent = document.getElementById('privacy-content');

if (privacyContent) {
  fetch('/privacy.md')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(markdown => {
      const html = marked.parse(markdown);
      privacyContent.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading privacy policy:', error);
      privacyContent.innerHTML = '<p>Error loading privacy policy.</p>';
    });
}
