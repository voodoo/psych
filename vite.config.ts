import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    // Allow access via localtunnel (e.g., https://<subdomain>.loca.lt)
    allowedHosts: ['.loca.lt']
  }
});
