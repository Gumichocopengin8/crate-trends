/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from '@emotion/react';
import { Divider, Link } from '@mui/material';

const Footer = (): JSX.Element => {
  return (
    <>
      <Divider />
      <footer css={Wrapper}>
        <div>
          a <Link href="https://github.com/Gumichocopengin8">Keita Nonaka</Link> production
        </div>
      </footer>
    </>
  );
};

const Wrapper = css`
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Footer;
