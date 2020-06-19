import { axios, cratesURL } from './api_config';

export const fetchCrateDataUsingGET = async (crateName: string) => {
  return axios
    .get(`${cratesURL}/${crateName}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};
