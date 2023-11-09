// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ['cdn3.iconfinder.com'], // Add the domain from your error message here
  // },
  webpack: (config, options) => {
    // Add a new rule for .node files
    config.module.rules.push({
      test: /\.node$/,
      use: 'raw-loader',
      include: [path.resolve(__dirname, 'node_modules')]
    });

    // Return the updated configuration
    return config;
  },
}

module.exports = nextConfig
