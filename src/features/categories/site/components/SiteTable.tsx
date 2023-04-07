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
import { Site } from 'models';

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  edit: {
    marginRight: 4,
  },
}));

export interface SiteTableProps {
  siteList: Site[];
  onEdit?:(site:Site)=>void;
  onRemove?: (site: Site) => void;
}

export default function SiteTable({ siteList, onEdit, onRemove }: SiteTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<Site>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (site: Site) => {
    setSelectedSite(site);
    setOpen(true);
  };

  const handleRemoveConfirm = (site: Site) => {
    onRemove?.(site);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>MÃ</TableCell>
              <TableCell>TÊN</TableCell>
              <TableCell>NGÀY TẠO</TableCell>
              <TableCell align="right">THAO TÁC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {siteList.map((site, index) => (
              <TableRow key={site.id}>
                <TableCell width={250}>{site.siteCode}</TableCell>
                <TableCell>{site.name}</TableCell>
                <TableCell>{site.dateCreated}</TableCell>
                <TableCell
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <IconButton aria-label="edit" color="primary" onClick={() => {}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    sx={{ color: red[500] }}
                    onClick={() => {
                      handleRemoveClick(site);
                    }}
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
            Bạn có chắc chắn muốn xoá cơ sở "{selectedSite?.name}"?. <br />
            Đây là thao tác không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button
            onClick={() => handleRemoveConfirm(selectedSite as Site)}
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
