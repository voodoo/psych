import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['*']
		}
	},
	vite: {
		server: {
			allowedHosts: 'all',
			hmr: false
		}
	}
};

export default config;
