import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
const alias = {
  '@src': '/src',
};
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: alias,
  },
});
