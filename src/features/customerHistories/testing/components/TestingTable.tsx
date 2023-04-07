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

export default function TestingTable({ data, startIndex }: TableProps) {
  const classes = useStyles();

  const getComfirmatoryTestResult = (key: number) => {
    if (key === 2) return t('Negative');
    if (key === 3) return t('Positive');
    return t('N/A');
  };

  const getRecencyTestResult = (key: number) => {
    if (key === 3) return t('Negative');
    if (key === 2) return t('Positive');
    return t('N/A');
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.customerCell}>#</TableCell>
              <TableCell className={classes.customerCell}>{t('customer name')}</TableCell>
              <TableCell className={classes.customerCell}>{t('customer phone')}</TableCell>
              <TableCell className={classes.customerCell}>{t('customer mpi code')}</TableCell>
              <TableCell>{t('laytest code')}</TableCell>
              <TableCell>{t('comfirmatory testing site')}</TableCell>
              <TableCell>{t('comfirmatory result date')}</TableCell>
              <TableCell>{t('comfirmatory result')}</TableCell>
              <TableCell>{t('recency result')}</TableCell>
              <TableCell>{t('recency result date')}</TableCell>
              <TableCell>{t('viral load test result')}</TableCell>
              <TableCell className={classes.artCell}>{t('unit register name')}</TableCell>
              <TableCell className={classes.artCell}>{t('ARV register date')}</TableCell>
              <TableCell className={classes.artCell}>{t('treatment code')}</TableCell>
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
                  <TableCell className={classes.customerCell}>
                    {item.customer && item.customer.name}
                  </TableCell>
                  <TableCell className={classes.customerCell}>
                    {item.customer && item.customer.phone}
                  </TableCell>
                  <TableCell className={classes.customerCell}>
                    {item.customer && item.customer.mpiCode}
                  </TableCell>
                  <TableCell>{item.history.reachCode}</TableCell>
                  <TableCell>{item.history.siteName}</TableCell>
                  <TableCell>{item.history.date.toString().split('T')[0]}</TableCell>
                  <TableCell>{getComfirmatoryTestResult(item.history.verifiedResult)}</TableCell>
                  <TableCell>{getRecencyTestResult(item.history.recencyResult)}</TableCell>
                  <TableCell>
                    {item.history.unitReceivedVerifiedResultDate?.toString()?.split('T')[0]}
                  </TableCell>
                  <TableCell>
                    {item.history.virusLoadResult1 &&
                      item.history.virusLoadResult1 +
                        (item.history.virusLoadResult1 != null
                          ? ` (${item.history.virusLoadResult2})`
                          : '')}
                  </TableCell>
                  <TableCell className={classes.artCell}>{item.history.siteTransferTo}</TableCell>
                  <TableCell className={classes.artCell}>{item.history.arvRegisterDate}</TableCell>
                  <TableCell className={classes.artCell}>{item.history.hivCode}</TableCell>
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
              <TableRow key={'no-data'}>
                <TableCell align="center" colSpan={14}>
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
