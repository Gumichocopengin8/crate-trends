import React from 'react';
import App from 'next/app';
import styled from 'styled-components';
import Header from 'components/shared/Header';
import Footer from 'components/shared/Footer';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <Wrapper>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 0 4rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 700px) {
    padding: 0 1rem;
  }
`;
