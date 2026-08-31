import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { marked } from 'marked';

const SITE_URL = 'https://veloscope.me';

export default function blogPrerender() {
  let root;
  let outDir;

  return {
    name: 'blog-prerender',
    configResolved(config) {
      root = config.root;
      outDir = config.build.outDir;
    },
    // Dev server: pretty /blog/<id>/ URLs don't exist as files until build,
    // so serve the post.html template for them (the client renders the article).
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0];
        // Match a slug segment only (no dot → excludes files like posts.json).
        if (/^\/blog\/[^/.]+\/?$/.test(url)) {
          req.url = '/post.html';
        }
        next();
      });
    },
    writeBundle() {
      // 1. Read posts.json
      const postsPath = resolve(root, 'public/blog/posts.json');
      const posts = JSON.parse(readFileSync(postsPath, 'utf-8'));

      // 2. Read the built post.html template from the output directory
      const templatePath = resolve(root, outDir, 'post.html');
      let templateHtml;
      try {
        templateHtml = readFileSync(templatePath, 'utf-8');
      } catch (e) {
        console.warn('[blog-prerender] Could not read built post.html template, skipping pre-render');
        return;
      }

      // 3. For each post, generate a pre-rendered HTML file
      for (const post of posts) {
        // Read the markdown source
        const mdPath = resolve(root, `public/blog/${post.id}/index.md`);
        let markdown;
        try {
          markdown = readFileSync(mdPath, 'utf-8');
        } catch (e) {
          console.warn(`[blog-prerender] Could not read ${mdPath}, skipping`);
          continue;
        }

        // Parse markdown to HTML
        const contentHtml = marked.parse(markdown);

        // Build the post meta header (eyebrow date · tag, title, author row)
        const eyebrow = post.tag
          ? `${formatDate(post.date)} · ${titleCase(post.tag)}`
          : formatDate(post.date);
        const postMetaHtml = `
            <span class="vs-post-eyebrow">${eyebrow}</span>
            <h1 class="post-meta-title">${post.title}</h1>
            <div class="vs-post-author"><span class="vs-post-avatar">M</span><div><span class="vs-post-author-name">Majk</span><span class="vs-post-author-sub">Founder, Veloscope</span></div></div>
          `;

        // Build SEO meta tags
        const postUrl = `${SITE_URL}/blog/${post.id}`;
        const thumbnailUrl = post.thumbnail ? `${SITE_URL}${post.thumbnail}` : `${SITE_URL}/src/assets/veloscope-icon.svg`;
        const escapedTitle = escapeHtml(post.title);
        const escapedExcerpt = escapeHtml(post.excerpt);

        const seoTags = `
  <meta name="description" content="${escapedExcerpt}">
  <link rel="canonical" href="${postUrl}">
  <meta property="og:title" content="${escapedTitle}">
  <meta property="og:description" content="${escapedExcerpt}">
  <meta property="og:image" content="${thumbnailUrl}">
  <meta property="og:url" content="${postUrl}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapedTitle}">
  <meta name="twitter:description" content="${escapedExcerpt}">
  <meta name="twitter:image" content="${thumbnailUrl}">`;

        const jsonLd = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "datePublished": post.date,
          "image": thumbnailUrl,
          "url": postUrl,
          "publisher": {
            "@type": "Organization",
            "name": "Veloscope",
            "url": SITE_URL
          }
        };

        const jsonLdScript = `\n  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;

        // Build the final HTML by modifying the template
        let html = templateHtml;

        // Replace the generic title
        html = html.replace(
          '<title>Post - Veloscope Blog</title>',
          `<title>${escapedTitle} - Veloscope Blog</title>`
        );

        // Inject SEO meta tags after the title
        html = html.replace(
          '</title>',
          `</title>${seoTags}${jsonLdScript}`
        );

        // Replace the loading placeholder with pre-rendered content
        html = html.replace(
          '<div id="post-meta" class="post-meta"></div>',
          `<div id="post-meta" class="post-meta">${postMetaHtml}</div>`
        );

        // Handle the post-content div replacement (be flexible with whitespace)
        html = html.replace(
          /(<div id="post-content" class="markdown-body blog-post-body">)\s*Loading Post\.\.\.\s*(<\/div>)/,
          `$1${contentHtml}$2`
        );

        // Write the pre-rendered file
        const outputDir = resolve(root, outDir, 'blog', post.id);
        mkdirSync(outputDir, { recursive: true });
        writeFileSync(resolve(outputDir, 'index.html'), html, 'utf-8');

        console.log(`[blog-prerender] Generated blog/${post.id}/index.html`);
      }
    },
  };
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function titleCase(s) {
  return String(s).charAt(0).toUpperCase() + String(s).slice(1).toLowerCase();
}
