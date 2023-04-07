import { Box, Button, IconButton, Paper, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { red } from '@mui/material/colors';
import { t } from 'i18next';

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  edit: {
    marginRight: 4,
  },
}));

export interface TableProps {
  ItemsList: any;
}

export default function CustomerTable({ ItemsList }: TableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>{t('Fullname')}</TableCell>
              <TableCell>{t('Phone')}</TableCell>
              <TableCell>{t('prEPCode')}</TableCell>
              <TableCell>{t('yoB')}</TableCell>
              <TableCell>{t('identity card')}</TableCell>
              <TableCell align="right">{t('Action')}</TableCell>
            </TableRow>
          </TableHead>
          {ItemsList?.length ? (
            <TableBody>
              {ItemsList.map((item: any, index: number) => (
                <TableRow key={item.id}>
                  <TableCell width={10}>{index + 1}</TableCell>
                  <TableCell width={200}>{item.name}</TableCell>
                  <TableCell width={100}>{item.phone}</TableCell>
                  <TableCell>{item.prEPCode}</TableCell>
                  <TableCell>{item.yoB}</TableCell>
                  <TableCell>{item.cmnd}</TableCell>
                  <TableCell
                    component="div"
                    align="right"
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <IconButton aria-label="{t('View')}" color="primary" onClick={() => {}}>
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  {t('No data to display')}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
