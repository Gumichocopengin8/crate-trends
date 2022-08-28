/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { fetchCrateDataUsingGET, fetchDownloadDataUsingGET } from 'api/index';
import { CrateResponse } from 'interfaces/crate';
import { Downloads } from 'interfaces/downloads';
import InputForm from 'components/shared/InputForm';
import ExtraInfo from 'components/shared/ExtraInfo';
import CratesTable from 'components/[crate_names]/CratesTable';
import DownloadChart from 'components/[crate_names]/DownloadChart';

const CratesCompare = (): JSX.Element => {
  const router = useRouter();
  const { crate_names } = router.query;
  const [cratesData, setCratesData] = useState<CrateResponse[]>([]);
  const [downloadsData, setDownloadsData] = useState<Downloads[]>([]);

  useEffect(() => {
    let unmounted = false;
    const func = async () => {
      if (!crate_names) return;
      const crateNames = Array.from(new Set(crate_names.toString().split('+'))); // unique!
      const crateRequests = crateNames.map((name) => fetchCrateDataUsingGET(name));
      const downloadRequests = crateNames.map((name) => fetchDownloadDataUsingGET(name));
      const cratesResults = await Promise.all(crateRequests);
      const downloadResults = await Promise.all(downloadRequests);
      const cratesData = cratesResults.filter((v) => v);
      const downloadsData = downloadResults.filter((v) => v);
      if (!unmounted) {
        setCratesData(cratesData);
        setDownloadsData(downloadsData);
      }

      const crateIds = cratesData.map((d) => d.crate.id);
      if (crateIds.length === 0) {
        router.push('/');
      } else if (String(crate_names).split('+').length !== crateIds.length) {
        router.push('/[crate_names]', `/${crateIds.join('+')}`);
      }
    };
    func();
    const cleanup = () => {
      unmounted = true;
    };
    return cleanup;
  }, [crate_names, router]);

  if (cratesData.length === 0 || downloadsData.length === 0) {
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
      <DownloadChart downloadsData={downloadsData} />
      <CratesTable cratesData={cratesData} />
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
