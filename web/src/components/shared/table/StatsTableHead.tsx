import { TableCell, TableHead, TableRow } from '@mui/material';

const StatsTableHead = () => {
  return (
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
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export default StatsTableHead;
