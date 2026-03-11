import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    // Allow access via localtunnel and Hostinger server
    allowedHosts: ['.loca.lt', 'srv1385161.hstgr.cloud', 'localhost']
  }
});
