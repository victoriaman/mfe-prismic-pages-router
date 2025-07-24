const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isProd ? '/mfe-prismic-pages-router/remote-app' : '',
  assetPrefix: isProd ? '/mfe-prismic-pages-router/remote-app' : '',
  output: 'export', // 👈 important for static export

  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'adminMFE',
        filename: 'static/runtime/remoteEntry.js',
        exposes: {
          './Header': './src/components/Header',
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
        },
        extraOptions: {
          skipSharingNextInternals: true,
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;

