/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';
import Header from 'components/shared/Header';
import Footer from 'components/shared/Footer';

const MyApp = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;
  const [isLoading, setLoadingState] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    router.events.on('routeChangeStart', () => setLoadingState(true));
    router.events.on('routeChangeComplete', () => setLoadingState(false));
    router.events.on('routeChangeError', () => setLoadingState(false));
  }, []);

  return (
    <Wrapper>
      <Head>
        <link rel="icon" href="/ferris.png" type="image/png" sizes="32x32" />
      </Head>
      <Header />
      {isLoading && (
        <PageIndicator>
          <img src="/ferris.png" alt="ferris icon" />
          <CircularProgress size={36} />
        </PageIndicator>
      )}
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

const PageIndicator = styled.div`
  position: fixed;
  top: 1rem;
  right: 2rem;

  > img {
    position: fixed;
    top: 20px;
    right: 38px;
    width: 24px;
    height: 24px;
  }
`;

export default MyApp;
