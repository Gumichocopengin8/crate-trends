import React from 'react';
import styled from 'styled-components';
import InputForm from 'components/shared/InputForm';

type FormData = {
  crateNameInput: string;
};

const Index = (): JSX.Element => {
  return (
    <Wrapper>
      <InputForm />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
`;

export default Index;
