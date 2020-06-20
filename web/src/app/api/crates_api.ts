import { axios, cratesURL } from './api_config';
import { CrateResponse } from 'interfaces/crate';

export const fetchCrateDataUsingGET = async (crateName: string): Promise<CrateResponse> => {
  return axios
    .get(`${cratesURL}/${crateName}`)
    .then((res) => res.data as CrateResponse)
    .catch((err) => {
      throw new Error(err);
    });
};
