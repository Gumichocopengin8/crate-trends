import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import InputForm from 'components/shared/InputForm';

const CratesCompare = (): JSX.Element => {
  const router = useRouter();
  const { crate_names } = router.query;

  return (
    <Wrapper>
      <InputForm />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
`;

export default CratesCompare;
