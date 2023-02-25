import { Skeleton, TableCell, TableRow, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import { css } from '@emotion/react';

const TableSkeltonRow = () => {
  return (
    <TableRow css={RootTableRow}>
      <TableCell padding="checkbox">
        <IconButton size="small" disabled>
          <KeyboardArrowDownIcon />
        </IconButton>
      </TableCell>
      <TableCell component="th" scope="row">
        <Skeleton height={32} />
      </TableCell>
      <TableCell>
        <Skeleton height={32} />
      </TableCell>
      <TableCell>
        <Skeleton height={32} />
      </TableCell>
      <TableCell>
        <Skeleton height={32} />
      </TableCell>
      <TableCell>
        <Skeleton height={32} />
      </TableCell>
      <TableCell>
        <Skeleton height={32} />
      </TableCell>
      <TableCell>
        <Skeleton height={32} />
      </TableCell>
      <TableCell>
        <Skeleton height={32} />
      </TableCell>
      <TableCell>
        <IconButton size="small" disabled>
          <CloseIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
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

export default TableSkeltonRow;
