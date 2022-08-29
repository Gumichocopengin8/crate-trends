/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { fetchCrateDataUsingGET, fetchDownloadDataUsingGET } from 'api/index';
import InputForm from 'components/shared/InputForm';
import ExtraInfo from 'components/shared/ExtraInfo';
import CratesTable from 'components/[crate_names]/CratesTable';
import DownloadChart from 'components/[crate_names]/DownloadChart';

const CratesCompare = (): JSX.Element => {
  const router = useRouter();
  const { crate_names } = router.query;
  const [crateNames, setCrateNames] = useState<string[]>([]);
  const crateDataResults = useQueries({
    queries: crateNames.map((crateName) => {
      return { queryKey: ['crateData', crateName], queryFn: () => fetchCrateDataUsingGET(crateName) };
    }),
  }).filter((v) => v.data);
  const crateDownloadDataResults = useQueries({
    queries: crateNames.map((crateName) => {
      return { queryKey: ['crateNameDownloads', crateName], queryFn: () => fetchDownloadDataUsingGET(crateName) };
    }),
  }).filter((v) => v.data);

  useEffect(() => {
    if (!crate_names) return;
    const crateNameList = Array.from(new Set(crate_names.toString().split('+'))); // unique!
    setCrateNames(crateNameList);
  }, [crate_names]);

  // TODO: it doesnt work after switching to react-query
  if (crateDataResults.some((d) => d.isLoading) || crateDownloadDataResults.some((d) => d.isLoading)) {
    return (
      <div css={PageIndicator}>
        <div className="loader" />
      </div>
    );
  }

  return (
    <div css={Wrapper}>
      <Head>
        <title>{String(crate_names).split('+').join(', ')} | Crate Trends</title>
      </Head>
      <InputForm />
      <DownloadChart downloadsData={crateDownloadDataResults.map((d) => d.data)} />
      <CratesTable cratesData={crateDataResults.map((d) => d.data)} />
      <ExtraInfo />
    </div>
  );
};

const Wrapper = css`
  flex: 1;
`;

const PageIndicator = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .loader,
  .loader:before,
  .loader:after {
    width: 1rem;
    height: 1rem;
    margin-bottom: 8rem;
    animation: load1 1s infinite ease-in-out;
    background: rgba(0, 0, 0, 0);
    border-radius: 1rem;
  }
  .loader {
    color: #eb7f04;
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    animation-delay: -0.16s;
  }
  .loader:before,
  .loader:after {
    position: absolute;
    top: 0;
    content: '';
  }
  .loader:before {
    left: -1.5rem;
    animation-delay: -0.4s;
  }
  .loader:after {
    left: 1.5rem;
  }

  @keyframes load1 {
    0%,
    100% {
      box-shadow: 0 0.5rem;
    }
    50% {
      box-shadow: 0 2rem;
    }
  }
`;

export default CratesCompare;
