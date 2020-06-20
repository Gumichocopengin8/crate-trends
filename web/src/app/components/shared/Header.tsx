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
