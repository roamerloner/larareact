import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/App.jsx'],
            refresh: true,
        }),
        react(),
    ],
    build: {
        outDir: 'public/build', // Ensure this is the correct output directory
        manifest: true,         // Enable manifest generation
        rollupOptions: {
            input: 'resources/js/App.jsx', // Main entry point for your app
        },
    },
});
