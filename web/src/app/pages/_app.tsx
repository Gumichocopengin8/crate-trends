/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import styled from 'styled-components';
import Header from 'components/shared/Header';
import Footer from 'components/shared/Footer';

const MyApp = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Wrapper>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 0 4rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 700px) {
    padding: 0 1rem;
  }
`;

export default MyApp;
