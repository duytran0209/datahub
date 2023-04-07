import { Box, Button, IconButton, Paper, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { red } from '@mui/material/colors';
import { t } from 'i18next';
import { Common, indicatorUtils } from 'utils/Common';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Report } from 'models';

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  edit: {
    marginRight: 4,
  },
}));

export interface TableProps {
  data: any;
  startIndex?: number;
  onSelectReport?: (report: Report) => void;
}

export default function ReportTable({ data, startIndex, onSelectReport }: TableProps) {
  const classes = useStyles();

  const getPeriodType = (periodType: number) => {
    if (periodType == 0) return t('Month');
    return t('Quarter');
  };

  const getDate = (date: any) => {
    if (typeof date == 'string') {
      date = new Date(date);
    }
    return date as Date;
  };

  const getYear = (date: any) => {
    return getDate(date).getFullYear();
  };

  const getQuarter = (date: any) => {
    return Math.trunc(getDate(date).getMonth() / 3) + 1;
  };

  const getMonth = (date: any) => {
    return getDate(date).getMonth() + 1;
  };

  const getValue = (item: any) => {
    try {
      if (item.type.includes('AccumulativeReport')) {
        return item.total;
      }
      return `${Math.round((item.numerator / item.denominator) * 10000) / 100}%`;
    } catch (error) {
      return 'N/A';
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow style={{ whiteSpace: 'nowrap' }}>
              <TableCell>#</TableCell>
              <TableCell>{t('PeriodType')}</TableCell>
              <TableCell>{t('Year')}</TableCell>
              <TableCell>{t('Quarter')}</TableCell>
              <TableCell>{t('Month')}</TableCell>
              <TableCell>{t('Indicator')}</TableCell>
              <TableCell>{t('Value')}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {data?.length ? (
            <TableBody>
              {data.map((item: any, index: number) => {
                return (
                  <TableRow key={item.id} style={{ whiteSpace: 'nowrap' }}>
                    <TableCell>{(startIndex ?? 0) + index + 1}</TableCell>
                    <TableCell>{getPeriodType(item.periodType)}</TableCell>
                    <TableCell>{getYear(item.reportPeriod)}</TableCell>
                    <TableCell>{getQuarter(item.reportPeriod)}</TableCell>
                    <TableCell>{item.periodType === 0 && getMonth(item.reportPeriod)}</TableCell>
                    <TableCell>{indicatorUtils.get(item.indicatorCode)}</TableCell>
                    <TableCell>{getValue(item)}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          onSelectReport?.(item as Report);
                        }}
                      >
                        <ReadMoreIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
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
    </>
  );
}
