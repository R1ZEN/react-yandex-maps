module.exports = [
  {
    path: 'dist/production/*.esm.js',
    limit: '4.24 kB',
  },
  {
    path: 'dist/production/*.umd.js',
    limit: '4.34 kB',
  },
  {
    path: 'dist/production/*maps.js',
    limit: '4.26 kB',
  },
];
