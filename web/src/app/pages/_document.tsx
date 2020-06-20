import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <html>
        <Head>
          <style>{`body {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            overflow-y: scroll;
          }
          input {
            outline: 0;
          }`}</style>

          <title>Crate Trends</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
