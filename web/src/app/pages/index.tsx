import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Typography, Link, FormControl, InputAdornment, IconButton, OutlinedInput } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useForm } from 'react-hook-form';

type FormData = {
  crateNameInput: string;
};

const Index = (): JSX.Element => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = ({ crateNameInput }: FormData) => {
    router.push('/compare/[crate_names]', `/compare/${crateNameInput}`);
  };

  return (
    <Wrapper>
      <Typography variant="h5" component="h2" gutterBottom>
        Compare Crates features for your Rust project
      </Typography>
      <Typography variant="body1" gutterBottom>
        You can find crates from{' '}
        <Link href="https://crates.io/" rel="noreferrer" target="_blank">
          crates.io
        </Link>
      </Typography>
      <Typography variant="caption" gutterBottom>
        Currently auto-suggestion feature is not supported
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl size="small" variant="outlined" fullWidth>
          <OutlinedInput
            name="crateNameInput"
            type="search"
            placeholder="Search Crates name"
            inputRef={register}
            defaultValue=""
            autoComplete="off"
            endAdornment={
              <InputAdornment position="end">
                <IconButton type="submit" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
`;

export default Index;
