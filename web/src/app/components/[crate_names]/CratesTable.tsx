/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';
import { CrateResponse } from 'interfaces/crate';
import CrateTableRow from './CrateTableRow';

interface Props {
  cratesData: CrateResponse[];
}

const CratesTable = ({ cratesData }: Props): JSX.Element => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Stats
      </Typography>
      <TableContainer variant="outlined" component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align="right">Total Downloads</TableCell>
              <TableCell align="right">Recent Downloads</TableCell>
              <TableCell align="right">Updated At</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="center">Doc</TableCell>
              <TableCell align="center">Homepage</TableCell>
              <TableCell align="center">Repo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cratesData.map((crate) => (
              <CrateTableRow key={crate.crate.id} crateData={crate} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CratesTable;
