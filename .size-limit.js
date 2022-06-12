module.exports = [
  {
    path: 'dist/*.esm.js',
    limit: '5 kB',
  },
  {
    path: 'dist/*.umd.js',
    limit: '5 kB',
  },
  {
    path: 'dist/*maps.js',
    limit: '5 kB',
  },
];
