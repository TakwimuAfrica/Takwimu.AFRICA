/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const withCSS = require('@zeit/next-css');
const withTM = require('next-transpile-modules');
const withImages = require('next-images');

module.exports = withBundleAnalyzer(
  withCSS(
    withImages(
      withTM({
        transpileModules: ['@codeforafrica/hurumap-ui'],
        target: 'serverless'
      })
    )
  )
);
