const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          // Adds PostCSS Normalize as the reset css with default options,
          // so that it honors browserslist config in package.json
          // which in turn let's users customize the target behavior as per their needs.
          postcssNormalize(),
        ],
        sourceMap: true,
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: true,
      },
    });
  }
  return loaders;
};

module.exports = { getStyleLoaders }