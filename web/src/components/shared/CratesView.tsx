/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { crateDataResultsState, crateDownloadDataResultsState } from 'recoil/atoms';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import InputForm from 'components/shared/InputForm';
import ExtraInfo from 'components/shared/ExtraInfo';
import CratesTable from 'components/[crate_names]/CratesTable';
import DownloadChart from 'components/[crate_names]/DownloadChart';

const CratesCompare = (): JSX.Element => {
  const router = useRouter();
  const { crate_names } = router.query;

  const [crateNames, setCrateNames] = useState([]);
  const crateDataResults = useRecoilValue(crateDataResultsState(crateNames));
  const crateDownloadDataResults = useRecoilValue(crateDownloadDataResultsState(crateNames));

  useEffect(() => {
    if (!crate_names) return;
    const crateNameList = Array.from(new Set(crate_names.toString().split('+'))); // unique!
    setCrateNames(crateNameList);
  }, [crate_names, setCrateNames]);

  return (
    <div css={Wrapper}>
      <Head>
        <title>{String(crate_names).split('+').join(', ')} | Crate Trends</title>
      </Head>
      <InputForm />
      <DownloadChart downloadsData={crateDownloadDataResults} />
      <CratesTable cratesData={crateDataResults} />
      <ExtraInfo />
    </div>
  );
};

const Wrapper = css`
  flex: 1;
`;

export default CratesCompare;
