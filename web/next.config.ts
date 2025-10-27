/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { NextConfig } from 'next';

const isProd = process.env.ENVIRONMENT === 'product_env';

const nextConfig: NextConfig = {
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
};

export default nextConfig;
