import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    // Automatic Sitemap & Robots.txt generation
    Sitemap({ 
      hostname: 'https://www.tripzybee.com',
      // Explicitly list your main pages to ensure they are indexed
      dynamicRoutes: [
        '/',
        '/india-group-tours-2026',
        '/solo-travel-india',
        '/rajasthan-curated-tour',
        '/kerala-adventure'
      ],
      // This will also generate a basic robots.txt for you
      generateRobotsTxt: true,
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Ensure the build output is clean for crawlers
  build: {
    outDir: 'dist',
    sourcemap: false, // Turn off for production to hide source code
  }
});