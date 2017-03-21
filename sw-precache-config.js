module.exports = {
  staticFileGlobs: [
    'dist/**.html',
    'dist/**.js',
    'dist/**.css',
    'dist/assets/media/spin.gif',
    'dist/assets/media/compounds/**/*',
    'dist/assets/media/logos/*'
  ],
  root: 'dist',
  stripPrefix: 'dist/',
  navigateFallback: '/index.html',
  runtimeCaching: [{
    urlPattern: /apps\.phar\.umich\.edu[/]study-mc/,
    handler: 'networkFirst'
  }]
};

