import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import viteCompression from 'vite-plugin-compression';
// @ts-ignore
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [react(), svgr(), viteCompression(), eslint()],
})
