import { Button, IconButton, Paper, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
import { AgeGroup } from 'models/ageGroup';

export interface AgeGroupTableProps {
  ageGroupList: AgeGroup[];
  onEdit?: (ageGroup: AgeGroup) => void;
  onRemove?: (ageGroup: AgeGroup) => void;
}

export default function AgeGroupTable({ ageGroupList, onRemove, onEdit }: AgeGroupTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>();

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveClick = (ageGroup: AgeGroup) => {
    setSelectedAgeGroup(ageGroup);
    setOpen(true);
  };
  const handleRemoveConfirm = (ageGroup: AgeGroup) => {
    onRemove?.(ageGroup);
    setOpen(false);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>TÊN</TableCell>
              <TableCell>TỪ</TableCell>
              <TableCell>ĐẾN</TableCell>
              <TableCell align="right">THAO TÁC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ageGroupList.map((ageGroup, index) => (
              <TableRow key={ageGroup.id}>
                <TableCell width={250}>{ageGroup.order}</TableCell>
                <TableCell>{ageGroup.name}</TableCell>
                <TableCell>{ageGroup.lowestAge}</TableCell>
                <TableCell>{ageGroup.olderAge}</TableCell>
                <TableCell
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => {
                      onEdit?.(ageGroup);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    sx={{ color: red[500] }}
                    onClick={() => handleRemoveClick(ageGroup)}
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
            Bạn có chắc chắn muốn xoá giới tính "{selectedAgeGroup?.name}"?. <br />
            Đây là thao tác không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>

          <Button
            onClick={() => handleRemoveConfirm(selectedAgeGroup as AgeGroup)}
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
function onRemove(ageGroup: AgeGroup) {
  throw new Error('Function not implemented.');
}
