/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { CircularProgress } from '@mui/material';
import { css } from '@emotion/react';
import Header from 'components/shared/Header';
import Footer from 'components/shared/Footer';

const MyApp = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;
  const [isLoading, setLoadingState] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // page indicator
    router.events.on('routeChangeStart', () => setLoadingState(true));
    router.events.on('routeChangeComplete', () => setLoadingState(false));
    router.events.on('routeChangeError', () => setLoadingState(false));

    // redirect if user access heroku page
    if (typeof window !== 'undefined') {
      if (location.hostname === 'crate-trends.herokuapp.com') {
        router.push('https://crate-trends.vercel.app');
      }
    }
  }, [router]);

  return (
    <React.StrictMode>
      <RecoilRoot>
        <div css={Wrapper}>
          <Head>
            <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
          </Head>
          <Header />
          {isLoading && (
            <div css={PageIndicator}>
              <img src="/ferris.png" alt="ferris icon" />
              <CircularProgress size={36} />
            </div>
          )}
          <Component {...pageProps} />
          <Footer />
        </div>
      </RecoilRoot>
    </React.StrictMode>
  );
};

const Wrapper = css`
  min-height: 100vh;
  padding: 0 4rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 700px) {
    padding: 0 1rem;
  }
`;

const PageIndicator = css`
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
