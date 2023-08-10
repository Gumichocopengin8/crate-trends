/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const isProd = process.env.ENVIRONMENT === 'product_env';

module.exports = {
  compiler: {
    emotion: true,
  },
  distDir: './build',

  env: {
    BASE_URL: isProd ? process.env.BASE_URL : 'http://localhost:8080/api/v1',
    GOOGLE_ANALYTICS_TAG_ID: process.env.GOOGLE_ANALYTICS_TAG_ID ?? '',
  },

  transpilePackages: ['echarts', 'zrender'],

  reactStrictMode: true,

  webpack(config, options) {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };

    return config;
  },
};
