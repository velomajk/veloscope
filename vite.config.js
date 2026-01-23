import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                privacy: resolve(__dirname, 'privacy.html'),
                contact: resolve(__dirname, 'contact.html'),
                security: resolve(__dirname, 'security.html'),
                documentation: resolve(__dirname, 'documentation.html'),
            },
        },
    },
});
