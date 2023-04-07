import { Button, IconButton, Paper, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Districts } from 'models/districts';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { red } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  edit: {
    marginRight: 4,
  },
}));

export interface DistrictsTableProps {
  districtsList: Districts[];
}

export default function DistrictsTable({ districtsList }: DistrictsTableProps) {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>MÃ</TableCell>
              <TableCell>SLUG</TableCell>
              <TableCell>LOẠI</TableCell>
              <TableCell>TÊN</TableCell>
              <TableCell>TIÊU CHUẨN</TableCell>
              <TableCell>ĐỊA CHỈ</TableCell>
              <TableCell>ĐỊA CHỈ CHUẨN</TableCell>
              <TableCell align="right">THAO TÁC</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {districtsList.map((district, index) => (
              <TableRow key={district.id}>
                <TableCell width={200}>{district.code}</TableCell>
                <TableCell>{district.slug}</TableCell>
                <TableCell>{district.type}</TableCell>
                <TableCell>{district.name}</TableCell>
                <TableCell>{district.nameWithType}</TableCell>
                <TableCell>{district.path}</TableCell>
                <TableCell>{district.pathWithType}</TableCell>
                <TableCell
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <IconButton aria-label="edit" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" sx={{ color: red[500] }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
