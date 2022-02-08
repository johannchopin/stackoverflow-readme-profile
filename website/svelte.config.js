import preprocess from 'svelte-preprocess';
import adapterStatic from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapterStatic({
      // default options are shown
      pages: 'build',
      assets: 'build',
      fallback: null
    })
	}
};

export default config;
