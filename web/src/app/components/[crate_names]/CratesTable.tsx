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
              <TableCell>Total Downloads</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Doc</TableCell>
              <TableCell>Repo</TableCell>
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
