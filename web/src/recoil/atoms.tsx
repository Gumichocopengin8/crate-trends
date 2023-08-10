import { atomFamily, atom } from 'recoil';
import { crateDataResultsQuery, crateDownloadDataResultsQuery } from 'recoil/selectors';
import { CrateResponse } from 'interfaces/crate';
import { Downloads } from 'interfaces/downloads';

export const crateDataResultsState = atomFamily<CrateResponse[], string[]>({
  key: 'crateDataResultsState',
  default: (crateNames) => crateDataResultsQuery(crateNames),
});

export const crateDownloadDataResultsState = atomFamily<Downloads[], string[]>({
  key: 'crateDownloadDataResultsState',
  default: (crateNames) => crateDownloadDataResultsQuery(crateNames),
});

export const isWasmLoadedState = atom<boolean>({
  key: 'isWasmLoaded',
  default: false,
});
