import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  logLevel: 'info',

  plugins: [sveltekit()],

  server: {
    fs: {
      strict: false
    }
  }
};

export default config;