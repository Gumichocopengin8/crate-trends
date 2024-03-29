/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableRow, Collapse, Box, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import { CrateResponse, Version } from 'interfaces/crate';
import prettyBytes from 'pretty-bytes';
import CrateSizeChart from './CrateSizeChart';

interface Props {
  crateData: CrateResponse;
}

const CrateTableRow = ({ crateData }: Props): JSX.Element => {
  const router = useRouter();
  const { crate_names } = router.query;
  const [open, setOpen] = useState<boolean>(false);
  const dateFormat = (date: Date): string => dayjs(date).format('MMM DD, YYYY');
  const onOpen = () => setOpen((state) => !state);

  const onRemoveCrate = () => {
    const newCratesArr = String(crate_names)
      .split('+')
      .filter((v) => v !== crateData.crate.name);
    if (newCratesArr.length === 0) {
      router.push('/');
    } else {
      router.push('/[crate_names]', `/${newCratesArr.join('+')}`);
    }
  };

  return (
    <>
      <TableRow css={RootTableRow}>
        <TableCell padding="checkbox">
          <IconButton size="small" onClick={onOpen}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="subtitle1" component="h2">
            <Link css={Anchor} href={`/details/${crateData.crate.name}`}>
              {crateData.crate.name}
            </Link>
          </Typography>
        </TableCell>
        <TableCell align="right">{crateData.crate.downloads.toLocaleString()}</TableCell>
        <TableCell align="right">{crateData.crate.recent_downloads?.toLocaleString() ?? 'N/A'}</TableCell>
        <TableCell align="right">{dateFormat(crateData.crate.updated_at)}</TableCell>
        <TableCell align="right">{dateFormat(crateData.crate.created_at)}</TableCell>
        <TableCell align="center">
          {crateData.crate.documentation ? (
            <Link css={Anchor} href={crateData.crate.documentation} target="_blank" rel="noreferrer">
              <DescriptionIcon />
            </Link>
          ) : (
            '-'
          )}
        </TableCell>
        <TableCell align="center">
          {crateData.crate.homepage ? (
            <Link css={Anchor} href={crateData.crate.homepage} target="_blank" rel="noreferrer">
              <HomeIcon />
            </Link>
          ) : (
            '-'
          )}
        </TableCell>
        <TableCell align="center">
          {crateData.crate.homepage ? (
            <Link
              css={Anchor}
              href={`https://crates.io/crates/${crateData.crate.name}`}
              target="_blank"
              rel="noreferrer"
            >
              <LaunchIcon />
            </Link>
          ) : (
            '-'
          )}
        </TableCell>
        <TableCell align="center">
          {crateData.crate.repository ? (
            <Link css={AnchorGitHub} color="inherit" href={crateData.crate.repository} target="_blank" rel="noreferrer">
              <GitHubIcon />
            </Link>
          ) : (
            '-'
          )}
        </TableCell>
        <TableCell>
          <IconButton size="small" onClick={onRemoveCrate}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="subtitle1" gutterBottom>
                Description: {crateData.crate.description ?? '-'}
              </Typography>
              <CrateSizeChart versionList={[...crateData.versions].reverse()} />
              <Typography variant="subtitle1" gutterBottom component="h3">
                Versions:
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Version Num</TableCell>
                    <TableCell align="right">Downloads</TableCell>
                    <TableCell align="right">Updated At</TableCell>
                    <TableCell align="right">Created At</TableCell>
                    <TableCell align="right">Yanked</TableCell>
                    <TableCell align="right">License</TableCell>
                    <TableCell align="right">Size</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {crateData.versions.map((version: Version) => (
                    <TableRow key={version.id}>
                      <TableCell>{version.num}</TableCell>
                      <TableCell align="right">{version.downloads.toLocaleString()}</TableCell>
                      <TableCell align="right">{dateFormat(version.updated_at)}</TableCell>
                      <TableCell align="right">{dateFormat(version.created_at)}</TableCell>
                      <TableCell align="right">{version.yanked.toString()}</TableCell>
                      <TableCell align="right">{version.license ?? '-'}</TableCell>
                      <TableCell align="right">{version.crate_size ? prettyBytes(version.crate_size) : '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const RootTableRow = css`
  &&& {
    background: #f5fffe;

    & > * {
      border-bottom: unset;
    }
  }
`;

const Anchor = css`
  color: #1976d2;
`;

const AnchorGitHub = css`
  color: inherit;
`;

export default CrateTableRow;
