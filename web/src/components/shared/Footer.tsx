/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styled from 'styled-components';
import { Divider, Link } from '@material-ui/core';

const Footer = (): JSX.Element => {
  return (
    <>
      <Divider />
      <Wrapper>
        <div>
          a <Link href="https://github.com/Gumichocopengin8">Keita Nonaka</Link> production
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.footer`
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Footer;
