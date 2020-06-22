/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Typography, Link } from '@material-ui/core';

const ExtraInfo = (): JSX.Element => {
  const router = useRouter();

  const onClickExplore = (link: string) => {
    router.push('/[crate_names]', `${link}`);
  };

  return (
    <Wrapper>
      <Explore>
        <Typography variant="h6" component="h3" gutterBottom>
          Explore
        </Typography>
        <Typography variant="subtitle1" component="div" gutterBottom>
          <div className="explore-links">
            <Link onClick={() => onClickExplore('/futures+tokio+async-std')} variant="subtitle1" component="button">
              futures vs tokio vs async-std
            </Link>
            <Link onClick={() => onClickExplore('/actix-web+rocket+iron+warp')} variant="subtitle1" component="button">
              actix-web vs rocket vs iron vs warp
            </Link>
            <Link onClick={() => onClickExplore('/yew+stdweb+percy')} variant="subtitle1" component="button">
              yew vs stdweb vs percy
            </Link>
          </div>
        </Typography>
      </Explore>
      <Thanks>
        <Typography variant="subtitle1" component="div" gutterBottom>
          If you want to request new features or report bugs, please make issues on{' '}
          <Link color="primary" href="https://github.com/Gumichocopengin8/crate-trends" rel="noreferrer">
            GitHub
          </Link>
        </Typography>
        <Typography variant="subtitle1" component="div" gutterBottom>
          If you intend to fix bugs or add new features, please fork the repository and submit pull requests!!
        </Typography>
        <Typography variant="subtitle1" component="div" gutterBottom>
          Thank you for using this website and Thank you for contributing in advance!!
        </Typography>
      </Thanks>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 2rem 0;
`;

const Explore = styled.div`
  margin-bottom: 2rem;

  .explore-links {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const Thanks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: gray;
`;

export default ExtraInfo;
