/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Head from 'next/head';
import { css } from '@emotion/react';
import InputForm from 'components/shared/InputForm';
import ExtraInfo from 'components/shared/ExtraInfo';

const Index = (): JSX.Element => {
  return (
    <div css={Wrapper}>
      <Head>
        <title>Crate Trends</title>
      </Head>
      <InputForm />
      <ExtraInfo />
    </div>
  );
};

const Wrapper = css`
  flex: 1;
`;

export default Index;
