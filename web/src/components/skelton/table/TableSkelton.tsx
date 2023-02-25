import { Table, TableContainer, Typography, Paper, TableBody } from '@mui/material';
import StatsTableHead from 'components/shared/table/StatsTableHead';
import TableSkeltonRow from './TableSkeltonRow';

interface Props {
  crateNames: string[];
}

const TableSkelton = ({ crateNames }: Props) => {
  return (
    <section>
      <Typography variant="h6" component="h3" gutterBottom>
        Stats
      </Typography>
      <TableContainer variant="outlined" component={Paper}>
        <Table>
          <StatsTableHead />
          <TableBody>
            {crateNames.map((name) => (
              <TableSkeltonRow key={name} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default TableSkelton;
