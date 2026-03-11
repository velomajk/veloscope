import { marked } from 'marked';
 // Import styles directly here for Vite to bundle

// --- Theme Logic ---

const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Function to set theme
function setTheme(theme) {
  if (theme === 'light') {
    document.documentElement.classList.add('light-theme');
    document.documentElement.classList.remove('dark-theme');
  } else {
    document.documentElement.classList.add('dark-theme');
    document.documentElement.classList.remove('light-theme');
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
    const currentTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
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

// --- Contact Page Logic ---
const contactContent = document.getElementById('contact-content');

if (contactContent) {
  fetch('/contact.md')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(markdown => {
      const html = marked.parse(markdown);
      contactContent.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading contact info:', error);
      contactContent.innerHTML = '<p>Error loading contact info.</p>';
    });
}


// --- Security Page Logic ---
const securityContent = document.getElementById('security-content');

if (securityContent) {
  fetch('/security.md')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(markdown => {
      const html = marked.parse(markdown);
      securityContent.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading security policy:', error);
      securityContent.innerHTML = '<p>Error loading security policy.</p>';
    });
}

// --- Documentation Page Logic ---
const documentationContent = document.getElementById('documentation-content');

if (documentationContent) {
  fetch('/documentation.md')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(markdown => {
      const html = marked.parse(markdown);
      documentationContent.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading documentation:', error);
      documentationContent.innerHTML = '<p>Error loading documentation.</p>';
    });
}

// --- Services Page Logic ---
const servicesContent = document.getElementById('services-content');

if (servicesContent) {
  fetch('/services.md')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(markdown => {
      const html = marked.parse(markdown);
      servicesContent.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading services info:', error);
      servicesContent.innerHTML = '<p>Error loading services info.</p>';
    });
}



// --- Blog Index Logic ---
const blogGrid = document.getElementById('blog-grid');

if (blogGrid) {
  fetch('/blog/posts.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(posts => {
      if (posts.length === 0) {
        blogGrid.innerHTML = '<p>No posts found.</p>';
        return;
      }
      
      let html = '';
      posts.forEach(post => {
        // Build the card layout dynamically
        html += `
          <a href="post.html?id=${post.id}" class="blog-card">
            <div class="blog-card-img-container">
              <img src="${post.thumbnail}" alt="${post.title}" loading="lazy" />
            </div>
            <div class="blog-card-content">
              <span class="blog-card-date">${post.date}</span>
              <h2 class="blog-card-title">${post.title}</h2>
              <p class="blog-card-excerpt">${post.excerpt}</p>
              <span class="blog-card-read-more">Read More</span>
            </div>
          </a>
        `;
      });
      blogGrid.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading blog posts:', error);
      blogGrid.innerHTML = '<p>Error loading blog posts.</p>';
    });
}

// --- Single Post Logic ---
const postContent = document.getElementById('post-content');
const postMeta = document.getElementById('post-meta');

if (postContent && postMeta) {
  // 1. Get the post ID from the URL query string, e.g. ?id=first-post
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (!postId) {
    postContent.innerHTML = '<p>Post ID not provided.</p>';
  } else {
    // 2. Fetch the metadata from posts.json to get the title and date for the header
    fetch('/blog/posts.json')
      .then(res => res.json())
      .then(posts => {
        const postMetaInfo = posts.find(p => p.id === postId);
        if (postMetaInfo) {
          postMeta.innerHTML = `
            <span class="post-meta-date">${postMetaInfo.date}</span>
            <h1 class="post-meta-title">${postMetaInfo.title}</h1>
          `;
        }
      })
      .catch(err => console.error('Error fetching post meta:', err));

    // 3. Fetch the actual markdown content
    fetch(`/blog/${postId}/index.md`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Post not found');
        }
        return response.text();
      })
      .then(markdown => {
        const html = marked.parse(markdown);
        postContent.innerHTML = html;
      })
      .catch(error => {
        console.error('Error loading post content:', error);
        postContent.innerHTML = '<p>Error loading post content. It may not exist.</p>';
      });
  }
}

// --- Mobile Navigation Logic ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
  });

  // Close menu when a link is clicked
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-active');
    });
  });
}
