/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styled from 'styled-components';
import { Typography, Link } from '@material-ui/core';

const ExtraInfo = (): JSX.Element => {
  return (
    <Wrapper>
      <Typography variant="subtitle1" gutterBottom>
        If you want to request new features or report bugs, please make issues on{' '}
        <Link color="primary" href="https://github.com/Gumichocopengin8/crate-trends" rel="noreferrer">
          GitHub
        </Link>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        If you intend to fix bugs or add new features, please fork the repository and submit pull requests!!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Thank you for using this website and Thank you for contributing in advance!!
      </Typography>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: gray;
`;

export default ExtraInfo;
