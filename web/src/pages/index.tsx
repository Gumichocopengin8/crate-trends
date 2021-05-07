/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import InputForm from 'components/shared/InputForm';
import ExtraInfo from 'components/shared/ExtraInfo';

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
