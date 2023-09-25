/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState, startTransition, Suspense } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import InputForm from 'components/shared/InputForm';
import ExtraInfo from 'components/shared/ExtraInfo';
import CratesTable from 'components/[crate_names]/CratesTable';
import DownloadChart from 'components/[crate_names]/DownloadChart';
import TableSkelton from 'components/skelton/table/TableSkelton';
import ChartSkelton from 'components/skelton/chart/ChartSkelton';

const CratesCompare = (): JSX.Element => {
  const router = useRouter();
  const { crate_names } = router.query;
  const title = `${String(crate_names).split('+').join(', ')} | Crate Trends`;

  const [isClient, setIsClient] = useState<boolean>(false);
  const [crateNames, setCrateNames] = useState<string[]>([]);

  useEffect(() => {
    // https://nextjs.org/docs/messages/react-hydration-error
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!crate_names) return;
    const crateNameList = Array.from(new Set(crate_names.toString().split('+'))); // unique!
    startTransition(() => {
      setCrateNames(crateNameList);
    });
  }, [crate_names, setCrateNames]);

  return (
    <div css={Wrapper} key={crateNames.join('+')}>
      <Head>
        <title>{title}</title>
      </Head>
      <InputForm />
      <Suspense fallback={<ChartSkelton />}>
        {isClient ? <DownloadChart crateNames={crateNames} /> : <ChartSkelton />}
      </Suspense>
      <Suspense fallback={<TableSkelton crateNames={crateNames} />}>
        <CratesTable crateNames={crateNames} />
      </Suspense>
      <ExtraInfo />
    </div>
  );
};

const Wrapper = css`
  flex: 1;
`;

export default CratesCompare;
