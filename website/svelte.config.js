import preprocess from 'svelte-preprocess';
import adapterStatic from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapterStatic({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html'
		}),
		prerender: { entries: [] }
	}
};

export default config;
