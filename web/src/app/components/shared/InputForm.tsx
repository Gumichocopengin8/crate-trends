import React from 'react';
import { useRouter } from 'next/router';
import { Typography, Link, FormControl, InputAdornment, IconButton, OutlinedInput } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
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
    const cratesNames: string[] = Array.from(new Set(param)); // somehome spread op not working
    router.push('/[crate_names]', `/${cratesNames.join('+')}`);
    reset({ crateNameInput: '' });
  };

  return (
    <>
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
            name="crateNameInput"
            type="search"
            placeholder="Search Crates name"
            inputRef={register({ required: true })}
            defaultValue=""
            autoComplete="off"
            autoFocus
            style={{ marginBottom: '1rem' }}
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
    </>
  );
};

export default InputForm;
