import { Button, IconButton, Paper, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Gender } from 'models';
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

export interface GenderTableProps {
  genderList: Gender[];
  onEdit?: (gender: Gender) => void;
  onRemove?: (gender: Gender) => void;
}

export default function GenderTable({ genderList,       onEdit, onRemove }: GenderTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<Gender>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (gender: Gender) => {
    setSelectedGender(gender);
    setOpen(true);
  };

  const handleRemoveConfirm = (gender: Gender) => {
    onRemove?.(gender);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {genderList.map((gender, index) => (
              <TableRow key={gender.id}>
                <TableCell width={310}>{gender.order}</TableCell>
                <TableCell>{gender.name}</TableCell>
                <TableCell
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <IconButton aria-label="edit" color="primary" onClick={() => onEdit?.(gender)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    sx={{ color: red[500] }}
                    onClick={() => handleRemoveClick(gender)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          <ClearIcon sx={{ fontSize: 60 }} color="error" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xoá giới tính "{selectedGender?.name}"?. <br />
            Đây là thao tác không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>

          <Button
            onClick={() => handleRemoveConfirm(selectedGender as Gender)}
            color="error"
            variant="contained"
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
