/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { axios, cratesURL } from './api_config';
import { CrateResponse } from 'interfaces/crate';
import { Downloads } from 'interfaces/downloads';

export const fetchCrateDataUsingGET = async (crateName: string): Promise<CrateResponse> => {
  return axios
    .get(`${cratesURL}/${crateName}`)
    .then((res) => res.data as CrateResponse)
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const fetchDownloadDataUsingGET = async (crateName: string): Promise<Downloads> => {
  return axios
    .get(`${cratesURL}/${crateName}/downloads`)
    .then((res) => res.data as Downloads)
    .catch((err) => {
      console.error(err);
      return null;
    });
};
