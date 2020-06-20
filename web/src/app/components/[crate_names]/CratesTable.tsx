import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

import { CrateResponse } from 'interfaces/crate';
import CrateTableRow from './CrateTableRow';

interface Props {
  data: CrateResponse[];
}

const CratesTable = ({ data }: Props): JSX.Element => {
  return (
    <div>
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
              <TableCell align="center">Repo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((crate) => (
              <CrateTableRow key={crate.crate.id} data={crate} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CratesTable;
