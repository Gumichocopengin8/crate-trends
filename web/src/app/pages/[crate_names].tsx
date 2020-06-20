import React from 'react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import { fetchCrateDataUsingGET } from 'api/index';
import { CrateResponse } from 'interfaces/crate';
import InputForm from 'components/shared/InputForm';
import CratesTable from 'components/[crate_names]/CratesTable';

type Props = {
  data: CrateResponse[];
};

const CratesCompare = ({ data }: Props): JSX.Element => {
  return (
    <Wrapper>
      <InputForm />
      <CratesTable data={data} />
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const crateNames = context.params.crate_names.toString().split('+');
  const requests = crateNames.map((name) => fetchCrateDataUsingGET(name));
  const results = await Promise.all(requests);
  const data = results.filter((v) => v);
  return { props: { data } };
};

const Wrapper = styled.div`
  flex: 1;
`;

export default CratesCompare;
