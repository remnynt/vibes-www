const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
  webpack: (config, options) => {
    options.buildExport = true;
    return config;
  },
  eslint: {
    // ESLint managed on the workspace level
    ignoreDuringBuilds: true
  },
  images: {
    loader: 'custom',
    disableStaticImages: true
  },
  trailingSlash: true
};

const config = withPlugins(
  [
    [
      optimizedImages,
      {
        // optimisation disabled by default, to enable check https://github.com/cyrilwanner/next-optimized-images
        optimizeImages: false
      }
    ]
  ],
  nextConfig
);

module.exports = config;
