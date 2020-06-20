import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import InputForm from 'components/shared/InputForm';
import ExtraInfo from 'components/shared/ExtraInfo';

type FormData = {
  crateNameInput: string;
};

const Index = (): JSX.Element => {
  return (
    <Wrapper>
      <Head>
        <title>Crate Trends</title>
      </Head>
      <InputForm />
      <ExtraInfo />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
`;

export default Index;
