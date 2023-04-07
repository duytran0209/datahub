import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import TableViewIcon from '@mui/icons-material/TableView';
import { Button, IconButton, Paper, Theme, Tooltip, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import { t } from 'i18next';
import { DrugHistory } from 'models';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
}));

export interface DrugTableProps {
  data: DrugHistory[];
  startIndex?: number;
  onSelect?: (drug: DrugHistory) => void;
  onRemove?: (drug: DrugHistory) => void;
}

export default function DrugHistoryTable({ data, onSelect, onRemove, startIndex }: DrugTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedDrugHistory, setSelectedDrugHistory] = useState<DrugHistory>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (drugHistory: DrugHistory) => {
    setSelectedDrugHistory(drugHistory);
    setOpen(true);
  };

  const handleRemoveConfirm = (drugHistory: DrugHistory) => {
    onRemove?.(drugHistory);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>{t('Site name')}</TableCell>
              <TableCell>{t('Reporting period')}</TableCell>
              <TableCell>{t('Year')}</TableCell>
              <TableCell>{t('Quarter')}</TableCell>
              <TableCell>{t('Month')}</TableCell>
              <TableCell align="center" width={120}>
                {t('Action')}
              </TableCell>
            </TableRow>
          </TableHead>
          {data?.length ? (
            <TableBody>
              {data.map((drugHistory, index) => (
                <TableRow key={drugHistory.id}>
                  <TableCell>{(startIndex ?? 0) + index + 1}</TableCell>
                  <TableCell>{drugHistory.siteName}</TableCell>
                  <TableCell>
                    {drugHistory.reportingPeriod === 0 ? t('Month') : t('Quarter')}
                  </TableCell>
                  <TableCell>{drugHistory.year}</TableCell>
                  <TableCell>{drugHistory.quarter}</TableCell>
                  <TableCell>{drugHistory.month}</TableCell>
                  <TableCell align="right">
                    <Tooltip title={t('Detail').toString()}>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          onSelect?.(drugHistory);
                        }}
                      >
                        <TableViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('Delete').toString()}>
                      <IconButton color="error" onClick={() => handleRemoveClick(drugHistory)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={7}>
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
            <Typography component="h6" variant="h6">
              {t('Do you want to delete?')}
            </Typography>
            <Typography>
              {t('site name')}: {selectedDrugHistory?.siteName}
            </Typography>
            <Typography>
              {t('year')}: {selectedDrugHistory?.year}
            </Typography>
            <Typography>
              {t('quarter')}: {selectedDrugHistory?.quarter}
            </Typography>
            <Typography>
              {t('month')}: {selectedDrugHistory?.month}
            </Typography>
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('cancel')}
          </Button>

          <Button
            onClick={() => handleRemoveConfirm(selectedDrugHistory as DrugHistory)}
            color="error"
            variant="contained"
            autoFocus
          >
            {t('delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
