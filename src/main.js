import { marked } from 'marked';
import './css/style.css'; // Import styles directly here for Vite to bundle

// Only run this logic if we are on the privacy page
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
