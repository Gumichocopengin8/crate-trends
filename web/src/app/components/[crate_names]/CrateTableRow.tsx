import React from 'react';
import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Collapse,
  Box,
  Typography,
  IconButton,
  Link,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DescriptionIcon from '@material-ui/icons/Description';
import { CrateResponse, Version } from 'interfaces/crate';

interface Props {
  data: CrateResponse;
}

const CrateTableRow = ({ data }: Props): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);
  const dateFormat = (date: Date) => dayjs(date).format('MMM DD, YYYY');
  const onOpen = () => setOpen((state) => !state);

  console.log(data);
  return (
    <>
      <TableRow key={data.crate.id}>
        <TableCell padding="checkbox">
          <IconButton size="small" onClick={onOpen}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Link href={data.crate.homepage} rel="noreferrer">
            {data.crate.name}
          </Link>
        </TableCell>
        <TableCell>{data.crate.downloads.toLocaleString()}</TableCell>
        <TableCell>{dateFormat(data.crate.updated_at)}</TableCell>
        <TableCell>{dateFormat(data.crate.created_at)}</TableCell>
        <TableCell>
          {data.crate.documentation ? (
            <Link href={data.crate.documentation} rel="noreferrer">
              <DescriptionIcon />
            </Link>
          ) : (
            '-'
          )}
        </TableCell>
        <TableCell>
          {data.crate.repository ? (
            <Link color="inherit" href={data.crate.repository} rel="noreferrer">
              <GitHubIcon />
            </Link>
          ) : (
            '-'
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="h3">
                Versions
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Version Num</TableCell>
                    <TableCell>Updated At</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Yanked</TableCell>
                    <TableCell>License</TableCell>
                    <TableCell>Size</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.versions.map((version: Version) => (
                    <TableRow key={version.id}>
                      <TableCell>{version.num}</TableCell>
                      <TableCell>{dateFormat(version.updated_at)}</TableCell>
                      <TableCell>{dateFormat(version.created_at)}</TableCell>
                      <TableCell>{version.yanked.toString()}</TableCell>
                      <TableCell>{version.license ?? '-'}</TableCell>
                      <TableCell>{version.crate_size ?? '-'}</TableCell>
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

export default CrateTableRow;
