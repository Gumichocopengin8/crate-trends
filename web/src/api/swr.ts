import useSWR from 'swr';
import { fetchCrateDataUsingGET, fetchDownloadDataUsingGET } from 'api/crates_api';

export const useCrateDataResultsQuery = (crateNames: string[]) => {
  const { data, error, isLoading } = useSWR(['fetchCrateDataUsingGET', crateNames], ([, crateNames]) =>
    Promise.all(crateNames.map((crateName) => fetchCrateDataUsingGET(crateName)))
  );
  return { crateDataResults: data ?? [], isLoading, error };
};

export const useCrateDownloadDataResultsQuery = (crateNames: string[]) => {
  const { data, error, isLoading } = useSWR(['fetchDownloadDataUsingGET', crateNames], ([, crateNames]) =>
    Promise.all(crateNames.map((crateName) => fetchDownloadDataUsingGET(crateName)))
  );
  return { crateDownloadDataResults: data, isLoading, error };
};
