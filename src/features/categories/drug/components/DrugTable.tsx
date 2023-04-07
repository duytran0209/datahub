import { Box, Button, IconButton, Paper, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Drug } from 'models';
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
import { t } from 'i18next';

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  edit: {
    marginRight: 4,
  },
}));

export interface DrugTableProps {
  drugList: Drug[];
  onEdit?: (drug: Drug) => void;
  onRemove?: (drug: Drug) => void;
}

export default function DrugTable({ drugList, onEdit, onRemove }: DrugTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<Drug>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (drug: Drug) => {
    setSelectedDrug(drug);
    setOpen(true);
  };

  const handleRemoveConfirm = (drug: Drug) => {
    onRemove?.(drug);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>{t('Drug name')}</TableCell>
              <TableCell>{t('Drug unit')}</TableCell>
              <TableCell align="right">{t('Action')}</TableCell>
            </TableRow>
          </TableHead>
          {drugList?.length ? (
            <TableBody>
              {drugList.map((drug, index) => (
                <TableRow key={drug.id}>
                  <TableCell width={310}>{index + 1}</TableCell>
                  <TableCell>{drug.name}</TableCell>
                  <TableCell>{drug.unit}</TableCell>
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
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => handleRemoveClick(drug)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      sx={{ color: red[500] }}
                      onClick={() => handleRemoveClick(drug)}
                    >
                      <DeleteIcon />
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
            <Typography component="h1" variant="h3">
              Bạn có chắc chắn muốn xoá thuốc "{selectedDrug?.name}"?
            </Typography>
            <br />
            Đây là thao tác không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>

          <Button
            onClick={() => handleRemoveConfirm(selectedDrug as Drug)}
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
