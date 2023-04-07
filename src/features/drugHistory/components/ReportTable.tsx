import { Paper, Theme } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import { t } from 'i18next';
import { DrugHistoryDetail } from 'models';
import React from 'react';
import { stringUtils } from 'utils';

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  edit: {
    marginRight: 4,
  },
}));

export interface ReportTableProps {
  data: DrugHistoryDetail[];
  startIndex?: number;
}

export default function ReportTable({ data, startIndex }: ReportTableProps) {
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 250px)' }}>
        <Table stickyHeader className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell rowSpan={2}>#</TableCell>
              <TableCell rowSpan={2}>{t('drug source')}</TableCell>
              <TableCell rowSpan={2} style={{ width: '120px' }}>
                {t('packing')}
              </TableCell>
              <TableCell rowSpan={2} style={{ width: '80px' }}>
                {t('unit name')}
              </TableCell>
              <TableCell rowSpan={2}>{t('lot number')}</TableCell>
              <TableCell rowSpan={2}>{t('expiration date')}</TableCell>
              <TableCell rowSpan={2}>{t('group')}</TableCell>
              <TableCell colSpan={7} align="center">
                {t('quantity')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ top: 37 }}>{t('beginning inventory')}</TableCell>
              <TableCell style={{ top: 37 }}>{t('import')}</TableCell>
              <TableCell style={{ top: 37 }}>{t('other import')}</TableCell>
              <TableCell style={{ top: 37 }}>{t('export to client')}</TableCell>
              <TableCell style={{ top: 37 }}>{t('export to other')}</TableCell>
              <TableCell style={{ top: 37 }}>{t('damage and loss')}</TableCell>
              <TableCell style={{ top: 37 }}>{t('ending inventory')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ top: 37 * 2, fontStyle: 'italic', fontWeight: 'normal' }}
                align="center"
              >
                (1)
              </TableCell>
              <TableCell
                style={{ top: 37 * 2, fontStyle: 'italic', fontWeight: 'normal' }}
                align="center"
              >
                (2)
              </TableCell>
              <TableCell
                style={{ top: 37 * 2, fontStyle: 'italic', fontWeight: 'normal' }}
                align="center"
              >
                (3)
              </TableCell>
              <TableCell
                style={{ top: 37 * 2, fontStyle: 'italic', fontWeight: 'normal' }}
                align="center"
              >
                (4)
              </TableCell>
              <TableCell
                style={{ top: 37 * 2, fontStyle: 'italic', fontWeight: 'normal' }}
                align="center"
              >
                (5)
              </TableCell>
              <TableCell
                style={{ top: 37 * 2, fontStyle: 'italic', fontWeight: 'normal' }}
                align="center"
              >
                (6)
              </TableCell>
              <TableCell
                style={{ top: 37 * 2, fontStyle: 'italic', fontWeight: 'normal' }}
                align="center"
              >
                (7)
              </TableCell>
              <TableCell
                style={{ top: 37 * 2, fontStyle: 'italic', fontWeight: 'normal' }}
                align="center"
              >
                (8)
              </TableCell>
              <TableCell
                style={{ top: 37 * 2, fontStyle: 'italic', fontWeight: 'normal' }}
                align="center"
              >
                (9)
              </TableCell>
              <TableCell
                style={{ top: 37 * 2, fontStyle: 'italic', fontWeight: 'normal' }}
                align="center"
              >
                (10)
              </TableCell>
              <TableCell
                style={{ top: 37 * 2, fontStyle: 'italic', fontWeight: 'normal' }}
                align="center"
              >
                (11)
              </TableCell>
              <TableCell
                style={{ top: 37 * 2, fontStyle: 'italic', fontWeight: 'normal' }}
                align="center"
              >
                (12)
              </TableCell>
              <TableCell
                style={{ top: 37 * 2, fontStyle: 'italic', fontWeight: 'normal' }}
                align="center"
              >
                (13)
              </TableCell>
              <TableCell
                style={{ top: 37 * 2, fontStyle: 'italic', fontWeight: 'normal' }}
                align="center"
              >
                (14)
              </TableCell>
            </TableRow>
          </TableHead>
          {data?.length ? (
            <TableBody>
              {data.map((report) => {
                return (
                  <React.Fragment key={report.drugName}>
                    <TableRow key={report.drugName}>
                      <TableCell style={{ fontWeight: 'bold' }} colSpan={14}>
                        - {report.drugName}
                      </TableCell>
                    </TableRow>
                    {report.details.map((detail, index) => (
                      <TableRow key={detail.source + detail.lotNumber}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell> {detail.source}</TableCell>
                        <TableCell>{detail.packing}</TableCell>
                        <TableCell>{detail.unitName}</TableCell>
                        <TableCell>{detail.lotNumber}</TableCell>
                        <TableCell>{detail.expirationDate.split('T')[0]}</TableCell>
                        <TableCell>{detail.group}</TableCell>
                        <TableCell>{stringUtils.formatNumber(detail.beginningInventory)}</TableCell>
                        <TableCell>{stringUtils.formatNumber(detail.import)}</TableCell>
                        <TableCell>{stringUtils.formatNumber(detail.otherImport)}</TableCell>
                        <TableCell>{stringUtils.formatNumber(detail.exportToClient)}</TableCell>
                        <TableCell>{stringUtils.formatNumber(detail.exportToOther)}</TableCell>
                        <TableCell>{stringUtils.formatNumber(detail.damageAndLoss)}</TableCell>
                        <TableCell>{stringUtils.formatNumber(detail.endingInventory)}</TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                );
              })}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={6}>
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
