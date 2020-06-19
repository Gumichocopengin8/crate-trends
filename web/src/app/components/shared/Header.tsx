import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Header = (): JSX.Element => {
  return (
    <Wrapper>
      <Link href="/">
        <HeaderTitle>Crates Trends</HeaderTitle>
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
`;

export default Header;
