const withCSS = require('@zeit/next-css');
const withTM = require('next-transpile-modules');
const withImages = require('next-images');

module.exports = withCSS(
  withImages(
    withTM({
      transpileModules: ['@codeforafrica/hurumap-ui']
    })
  )
);
