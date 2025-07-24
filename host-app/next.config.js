const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const isProd = process.env.NODE_ENV === 'production';
const prodPath = '/mfe-prismic-pages-router/host-app';

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  basePath: isProd ? prodPath : '',
  assetPrefix: isProd ? prodPath : '',
  output: 'export', // 👈 important for static export
  publicRuntimeConfig: {
    basePath: isProd ? prodPath : '', // 👈 available at runtime
  },
  images: {
    unoptimized: true, // ✅ disable image optimization for static export
  },

  webpack(config, options) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'hostApp',
          filename: 'static/runtime/remoteEntry.js', // ✅ REQUIRED even in host
          remotes: {
            adminMFE: isProd ? 'adminMFE@https://victoriaman.github.io/mfe-prismic-pages-router/remote-app/_next/static/runtime/remoteEntry.js' : 'adminMFE@http://localhost:3001/_next/static/runtime/remoteEntry.js'
          },
          shared: {
            react: { singleton: true, requiredVersion: false },
            'react-dom': { singleton: true, requiredVersion: false },
          },
          extraOptions: {
            skipSharingNextInternals: true, // ✅ avoid internal Next.js conflicts
          },
        })
      );

      // ⛔ chặn resolve tới react-server-dom-webpack
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'react-server-dom-webpack/client': false,
        'react-server-dom-webpack/client.edge': false,
      };
      return config;
    },
};

module.exports = nextConfig;

