/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="en">
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
        <meta name="google-site-verification" content="koqh25055ZnqyD5EXDbfBKNBI9TtoklhiGvSLAjOgD0" />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_TAG_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.GOOGLE_ANALYTICS_TAG_ID}');
          `,
          }}
        />
      </Head>
      <body className="custom_class">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
