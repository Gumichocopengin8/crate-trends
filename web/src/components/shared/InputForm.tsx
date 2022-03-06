/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useRouter } from 'next/router';
import { Typography, Link, FormControl, InputAdornment, IconButton, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from 'react-hook-form';

type FormData = {
  crateNameInput: string;
};

const InputForm = (): JSX.Element => {
  const router = useRouter();
  const { crate_names } = router.query;
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = ({ crateNameInput }: FormData) => {
    const param = crate_names ? String(crate_names).split('+') : [];
    param.push(crateNameInput);
    const cratesNames: string[] = Array.from(new Set(param)); // somehow spread op not working
    router.push('/[crate_names]', `/${cratesNames.join('+')}`);
    reset();
  };

  return <>
    <Typography variant="h5" component="h2" gutterBottom>
      Compare Crates features for your Rust project
    </Typography>
    <Typography variant="body1" gutterBottom>
      You can find crates from{' '}
      <Link href="https://crates.io/" rel="noreferrer">
        crates.io
      </Link>
    </Typography>
    <Typography variant="caption" gutterBottom>
      Currently auto-suggestion feature is not supported
    </Typography>
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl size="small" variant="outlined" fullWidth>
        <OutlinedInput
          {...register('crateNameInput', { required: true })}
          type="search"
          placeholder="Search Crates name"
          defaultValue=""
          autoComplete="off"
          autoFocus
          style={{ marginBottom: '1rem' }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" edge="end" size="large">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  </>;
};

export default InputForm;
