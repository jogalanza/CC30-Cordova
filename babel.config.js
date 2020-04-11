const path = require('path')

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    '@babel/preset-env',
  ],
  plugins: [
    [
      'transform-imports',
      {
        quasar: {
          transform: 'quasar/dist/babel-transforms/imports.js',
          preventFullImport: true,
        },
      },
    ],
  ]
};
