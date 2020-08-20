module.exports = () => ({
  babelrc: false,
  cacheDirectory: true,
  compact: true,
  minified: true,
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        modules: false,
        exclude: ['transform-typeof-symbol'],
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        regenerator: true,
        useESModules: true,
      },
    ],
  ],
})
