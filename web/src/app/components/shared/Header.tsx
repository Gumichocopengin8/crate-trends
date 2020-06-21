/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Header = (): JSX.Element => {
  return (
    <Wrapper>
      <Link href="/">
        <HeaderTitle>
          <span className="crab">🦀</span> Crate Trends
        </HeaderTitle>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  padding: 1rem 0;
`;

const HeaderTitle = styled.h1`
  width: fit-content;
  margin: 0;
  font-size: 1.75rem;
  font-weight: normal;
  cursor: pointer;

  &:hover > .crab {
    animation: crab-animetion 2s linear infinite;
  }

  .crab {
    display: inline-block;
  }

  @keyframes crab-animetion {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Header;
