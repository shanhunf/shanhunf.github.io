import github from '@astrojs/github-pages';

export default {
  site: 'https://shanhunf.github.io',
  output: 'static',
  adapter: github(),
};
