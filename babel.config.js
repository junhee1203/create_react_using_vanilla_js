module.exports = {
  presets: [['@babel/preset-env'], '@babel/preset-typescript'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'React.createElement',
        pragmaFrag: 'Fragment',
      },
    ],
  ],
};
