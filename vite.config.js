import { defineConfig } from 'vite';
import { resolve } from 'path';
import blogPrerender from './vite-plugin-blog-prerender.js';

export default defineConfig({
    base: '/',
    plugins: [blogPrerender()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                privacy: resolve(__dirname, 'privacy.html'),
                contact: resolve(__dirname, 'contact.html'),
                security: resolve(__dirname, 'security.html'),
                services: resolve(__dirname, 'services.html'),
                documentation: resolve(__dirname, 'documentation.html'),
                blog: resolve(__dirname, 'blog.html'),
                post: resolve(__dirname, 'post.html'),
            },
        },
    },
});
