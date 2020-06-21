/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axiosBase from 'axios';

const urlBase = process.env.BASE_URL;
const headers = {
  'Content-Type': 'application/json',
  // 'X-Requested-With': 'XMLHttpRequest',
};

export const axios = axiosBase.create({
  baseURL: urlBase,
  headers,
  responseType: 'json',
});

export const cratesURL = '/crates';
