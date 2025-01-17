module.exports = {
  presets: [
    // '@babel/preset-env', // for ES6+ syntax
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react', // for JSX (if you're using React)
    '@babel/preset-typescript', // for TypeScript (if you're using TypeScript)
  ],
  //plugins: ['@babel/plugin-proposal-class-properties'],
}
