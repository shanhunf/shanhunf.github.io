import { defineConfig } from 'astro';
import github from '@astrojs/github-pages';

export default defineConfig({
  site: 'https://shanhunf.github.io',
  output: 'static',
  adapter: github(),
});
