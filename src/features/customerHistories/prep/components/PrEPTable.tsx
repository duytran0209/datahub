import DeleteIcon from '@mui/icons-material/Delete';
import TableViewIcon from '@mui/icons-material/TableView';
import { IconButton, Paper, Theme, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import { t } from 'i18next';

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  edit: {
    marginRight: 4,
  },
  customerCell: {
    backgroundColor: 'whitesmoke',
  },
  artCell: {
    backgroundColor: 'whitesmoke',
  },
}));

export interface TableProps {
  data: any;
  startIndex?: number;
}

export default function PrepTable({ data, startIndex }: TableProps) {
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.customerCell}>#</TableCell>
              <TableCell className={classes.customerCell}>{t('customer name')}</TableCell>
              <TableCell className={classes.customerCell}>{t('customer phone')}</TableCell>
              <TableCell className={classes.customerCell}>{t('PrEP code')}</TableCell>
              <TableCell>{t('laytest code')}</TableCell>
              <TableCell>{t('site')}</TableCell>
              <TableCell>{t('examination date')}</TableCell>
              <TableCell>{t('PrEP Graph')}</TableCell>
              <TableCell>{t('granted drugs')}</TableCell>
              <TableCell>{t('re-examtiona date')}</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          {data?.length ? (
            <TableBody>
              {data.map((item: any, index: number) => (
                <TableRow key={index} style={{ whiteSpace: 'nowrap' }}>
                  <TableCell className={classes.customerCell}>
                    {(startIndex ?? 0) + index + 1}
                  </TableCell>
                  <TableCell className={classes.customerCell}>{item.customer.name}</TableCell>
                  <TableCell className={classes.customerCell}>{item.customer.phone}</TableCell>
                  <TableCell className={classes.customerCell}>{item.customer.prEPCode}</TableCell>
                  <TableCell>{item.history.reachCode}</TableCell>
                  <TableCell>{item.history.siteName}</TableCell>
                  <TableCell>{item.history.date.toString().split('T')[0]}</TableCell>
                  <TableCell>{item.history.prEPGraph}</TableCell>
                  <TableCell>{item.history.grantedDrugs}</TableCell>
                  <TableCell>{item.history.nextDate?.toString()?.split('T')[0]}</TableCell>
                  <TableCell align="right">
                    <Tooltip title={t('Detail').toString()}>
                      <IconButton color="primary" onClick={() => {}}>
                        <TableViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('Delete').toString()}>
                      <IconButton color="error" onClick={() => {}}>
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
                <TableCell align="center" colSpan={11}>
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
