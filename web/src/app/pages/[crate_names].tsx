/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
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
  }, [crate_names]);

  return (
    <Wrapper>
      <Head>
        <title>{String(crate_names).split('+').join(', ')} | Crate Trends</title>
      </Head>
      <InputForm />
      <DownloadChart downloadsData={downloadsData} />
      <CratesTable cratesData={cratesData} />
      <ExtraInfo />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
`;

export default CratesCompare;
