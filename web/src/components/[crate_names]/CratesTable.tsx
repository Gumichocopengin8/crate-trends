/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Table, TableBody, TableContainer, Paper, Typography } from '@mui/material';
import StatsTableHead from 'components/shared/table/StatsTableHead';
import CrateTableRow from './CrateTableRow';
import { useCrateDataResultsQuery } from 'api';
import TableSkelton from 'components/skelton/table/TableSkelton';

interface Props {
  crateNames: string[];
}

const CratesTable = ({ crateNames }: Props): JSX.Element => {
  const { crateDataResults, isLoading } = useCrateDataResultsQuery(crateNames);

  // TODO: remove this when swr supports React Suspense
  if (isLoading) {
    return <TableSkelton crateNames={crateNames} />;
  }

  return (
    <section>
      <Typography variant="h6" component="h3" gutterBottom>
        Stats
      </Typography>
      <TableContainer variant="outlined" component={Paper}>
        <Table>
          <StatsTableHead />
          <TableBody>
            {crateDataResults.map((crate) => (
              <CrateTableRow key={crate.crate.id} crateData={crate} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default CratesTable;
