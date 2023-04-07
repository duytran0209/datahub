import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Paper, Theme } from '@mui/material';
import { red } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import CommonDialog from 'components/Common/CommonDialog';
import { t } from 'i18next';
import { KeyPopulation } from 'models';
import React, { useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  edit: {
    marginRight: 4,
  },
}));

export interface KeyPopulationTableProps {
  keyPopulationList: KeyPopulation[];
  onEdit?: (keyPopulation: KeyPopulation) => void;
  onRemove?: (keyPopulation: KeyPopulation) => void;
}

export default function KeyPopulationTable({
  keyPopulationList,
  onEdit,
  onRemove,
}: KeyPopulationTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedKeyPopulation, setSelectedKeyPopulation] = useState<KeyPopulation>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (keyPopulation: KeyPopulation) => {
    setSelectedKeyPopulation(keyPopulation);
    setOpen(true);
  };

  const handleRemoveConfirm = (keyPopulation: KeyPopulation) => {
    onRemove?.(keyPopulation);
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
              <TableCell>Mô tả</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {keyPopulationList?.length ? (
              keyPopulationList.map((keyPopulation, index) => (
                <TableRow key={keyPopulation.id}>
                  <TableCell width={310}>{keyPopulation.order}</TableCell>
                  <TableCell>{keyPopulation.name}</TableCell>
                  <TableCell>{keyPopulation.descriptions}</TableCell>
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
                      onClick={() => onEdit?.(keyPopulation)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      sx={{ color: red[500] }}
                      onClick={() => handleRemoveClick(keyPopulation)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  {t('No data to display')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove dialog */}
      <CommonDialog
        open={open}
        onClose={handleClose}
        item={selectedKeyPopulation}
        onConfirm={handleRemoveConfirm}
        mainMessage={t('ConfirmDeleteMessage', {
          type: t('Key Population'),
          item: selectedKeyPopulation?.name,
        })}
        subMessage={t('SubConfirmDeleteMessage')}
      />
    </>
  );
}
