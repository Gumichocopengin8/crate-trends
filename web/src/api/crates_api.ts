/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import dayjs from 'dayjs';
import { axios, cratesURL } from './api_config';
import { CrateResponse } from 'interfaces/crate';
import { Downloads } from 'interfaces/downloads';

export const fetchCrateDataUsingGET = async (crateName: string): Promise<CrateResponse> => {
  return axios
    .get(`${cratesURL}/${crateName}`)
    .then((res) => res.data as CrateResponse)
    .catch((err) => {
      console.error(err);
      const empty: CrateResponse = {
        categories: [],
        crate: {
          id: '',
          name: '',
          downloads: 0,
          max_version: '',
          links: {
            owner_team: '',
            owner_user: '',
            owners: '',
            reverse_dependencies: '',
            version_downloads: '',
          },
          created_at: dayjs().toDate(),
          updated_at: dayjs().toDate(),
        },
        keywords: [],
        versions: [],
      };
      return empty;
    });
};

export const fetchDownloadDataUsingGET = async (crateName: string): Promise<Downloads> => {
  return axios
    .get(`${cratesURL}/${crateName}/downloads`)
    .then((res) => res.data as Downloads)
    .catch((err) => {
      console.error(err);
      const empty: Downloads = {
        version_downloads: [],
        meta: {
          extra_downloads: [],
        },
      };
      return empty;
    });
};
