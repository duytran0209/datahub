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
import { Province } from 'models';
import { useState } from 'react';
const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  edit: {
    marginRight: 4,
  },
}));

export interface ProvinceTableProps {
  provinceList: Province[];
  onEdit?: (province: Province) => void;
  onRemove?: (province: Province) => void;
}

export default function ProvinceTable({ provinceList, onEdit, onRemove }: ProvinceTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<Province>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (province: Province) => {
    setSelectedProvince(province);
    setOpen(true);
  };

  const handleRemoveConfirm = (province: Province) => {
    onRemove?.(province);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('#')}</TableCell>
              <TableCell>{t('code')}</TableCell>
              <TableCell>{t('slug')}</TableCell>
              <TableCell>{t('type')}</TableCell>
              <TableCell>{t('name')}</TableCell>
              <TableCell>{t('nameWithType')}</TableCell>
              <TableCell align="right">{t('action')}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {provinceList?.length ? (
              provinceList.map((province, index) => (
                <TableRow key={province.id}>
                  <TableCell width={130}>{index + 1}</TableCell>
                  <TableCell width={150}>{province.code}</TableCell>
                  <TableCell>{province.slug}</TableCell>
                  <TableCell>{province.type}</TableCell>
                  <TableCell>{province.name}</TableCell>
                  <TableCell>{province.nameWithType}</TableCell>
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
                      onClick={() => onEdit?.(province)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      sx={{ color: red[500] }}
                      onClick={() => handleRemoveClick(province)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={8}>
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
        item={selectedProvince}
        onConfirm={handleRemoveConfirm}
        mainMessage={t('ConfirmDeleteMessage', {
          type: t('Key Population'),
          item: selectedProvince?.name,
        })}
        subMessage={t('SubConfirmDeleteMessage')}
      />
    </>
  );
}
