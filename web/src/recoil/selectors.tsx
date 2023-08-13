import { selector, selectorFamily, waitForAll } from 'recoil';
import { CrateResponse } from 'interfaces/crate';
import { Downloads } from 'interfaces/downloads';
import { fetchCrateDataUsingGET, fetchDownloadDataUsingGET } from 'api/index';
import init from 'web_assembly/pkg';

const crateDataResultQuery = selectorFamily<CrateResponse, string>({
  key: 'crateDataResultQuery',
  get: (crateName) => async () => {
    const response = await fetchCrateDataUsingGET(crateName);
    return response;
  },
});

export const crateDataResultsQuery = selectorFamily<CrateResponse[], string[]>({
  key: 'crateDataResultsQuery',
  get:
    (crateNames) =>
    ({ get }) => {
      const crateDataResults = get(waitForAll(crateNames.map((crateName) => crateDataResultQuery(crateName))));
      return crateDataResults.filter((d) => d);
    },
});

const crateDownloadDataResultQuery = selectorFamily<Downloads, string>({
  key: 'crateDownloadDataResultQuery',
  get: (crateName) => async () => {
    const response = await fetchDownloadDataUsingGET(crateName);
    return response;
  },
});

export const crateDownloadDataResultsQuery = selectorFamily<Downloads[], string[]>({
  key: 'crateDownloadDataResultsQuery',
  get:
    (crateNames) =>
    ({ get }) => {
      const crateDataResults = get(waitForAll(crateNames.map((crateName) => crateDownloadDataResultQuery(crateName))));
      return crateDataResults.filter((d) => d);
    },
});

export const wasmInitSelector = selector<boolean>({
  key: 'wasmInitSelector',
  get: async () => {
    return await init()
      .then(() => true)
      .catch(() => {
        console.error('failed to load web assembly');
        return false;
      });
  },
});
