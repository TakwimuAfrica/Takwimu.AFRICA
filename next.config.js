/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withBundleAnalyzer(
  withCSS(
    withImages({
      webpack(config, { isServer, webpack }) {
        // ISSUE: https://github.com/bitinn/node-fetch/issues/412#issuecomment-379007792
        // Should be ignore: https://github.com/zeit/next.js/issues/7621#issuecomment-504694519
        config.plugins.push(
          new webpack.IgnorePlugin(/^encoding$/, /node-fetch/)
        );

        // support font & image imports inside css files
        config.module.rules.push({
          test: /\.(woff|woff2|eot|ttf|otf|png|gif|ico|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: require.resolve('file-loader'),
              options: {
                name: '[name]-[hash:8].[ext]',
                publicPath: url => {
                  return `/_next/static/css/${url}`;
                },
                outputPath: `${isServer ? '../' : ''}static/css/`,
                esModule: false
              }
            }
          ]
        });

        return config;
      }
    })
  )
);
