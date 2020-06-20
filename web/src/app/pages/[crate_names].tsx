import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
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

type Props = {
  cratesData: CrateResponse[];
  downloadsData: Downloads[];
};

const CratesCompare = ({ cratesData, downloadsData }: Props): JSX.Element => {
  const router = useRouter();
  const { crate_names } = router.query;

  useEffect(() => {
    // fix url param
    const path = cratesData.map((d) => d.crate.id);
    if (String(crate_names).split('+').length !== path.length) {
      router.push('/[crate_names]', `/${path.join('+')}`);
    }
  });

  return (
    <Wrapper>
      <Head>
        <title>Crate Trends</title>
      </Head>
      <InputForm />
      <DownloadChart downloadsData={downloadsData} />
      <CratesTable cratesData={cratesData} />
      <ExtraInfo />
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const crateNames = Array.from(new Set(context.params.crate_names.toString().split('+'))); // unique!
  const crateRequests = crateNames.map((name) => fetchCrateDataUsingGET(name));
  const downloadRequests = crateNames.map((name) => fetchDownloadDataUsingGET(name));
  const cratesResults = await Promise.all(crateRequests);
  const downloadResults = await Promise.all(downloadRequests);
  const cratesData = cratesResults.filter((v) => v);
  const downloadsData = downloadResults.filter((v) => v);
  return { props: { cratesData, downloadsData } };
};

const Wrapper = styled.div`
  flex: 1;
`;

export default CratesCompare;
