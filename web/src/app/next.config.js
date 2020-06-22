/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const isProd = process.env.ENVIRONMENT === 'product_env';

module.exports = {
  distDir: '../../build/next',

  env: {
    BASE_URL: isProd ? process.env.BASE_URL : 'http://localhost:8080/api/v1',
    GOOGLE_ANALYTICS_TAG_ID: process.env.GOOGLE_ANALYTICS_TAG_ID ?? '',
  },

  webpack(config, options) {
    config.plugins = config.plugins || [];

    config.plugins = [...config.plugins];

    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.resolve.alias['api'] = path.join(__dirname, 'api');
    config.resolve.alias['interfaces'] = path.join(__dirname, 'interfaces');
    return config;
  },
};
