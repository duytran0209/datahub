import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import { Pagination } from '@mui/lab';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  TablePagination,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

import { viVN } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Popup from 'components/Common/PopUp';
import { t } from 'i18next';
import { ListParams, Report } from 'models';
import React, { useEffect, useState } from 'react';
import ReportFilters from '../components/ReportFilters';
import ReportTable from '../components/ReportTable';
import {
  reportActions,
  selectReportFilter,
  selectReportList,
  selectReportLoading,
  selectReportPageCount,
  selectReportTotalRow,
} from '../reportSlice';
import { CalculateReportPage } from './CalculateReportPage';
import { useHistory } from 'react-router-dom';

const theme = createTheme({}, viVN);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleContainer: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',

      marginBottom: 16,
    },

    loading: {
      position: 'absolute',
      top: -8,
      width: '100%',
    },
    filter: {
      width: '100%',
      display: 'flex',
      justifyItems: 'space-between',
      alignItems: 'center',
    },
  })
);

export default function ListPage() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectReportFilter);
  const loading = useAppSelector(selectReportLoading);
  const data = useAppSelector(selectReportList);
  const pageCount = useAppSelector(selectReportPageCount);
  const totalRow = useAppSelector(selectReportTotalRow);

  const [openPopup, setOpenPopup] = useState<boolean>(false);

  useEffect(() => {
    dispatch(reportActions.fetchReportList(filter));
  }, [dispatch, filter]);

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(reportActions.setFilter(newFilter));
  };

  const handlePageChange = (page: number) => {
    dispatch(
      reportActions.setFilter({
        ...filter,
        pageIndex: page,
      })
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      reportActions.setFilter({
        ...filter,
        pageIndex: 0,
        pageSize: parseInt(event.target.value, 10),
      })
    );
  };

  const handleSelectReport = (report: Report) => {
    history.push(`/report/detail/${report.id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: 20 }}>
        {/*
          Title
        */}
        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h5" fontWeight="bold">
            {t('report management')}
          </Typography>
        </Box>
        {/*
          Filter
        */}
        <ReportFilters filter={filter} onChange={handleFilterChange} />
        {/*
          Loading 
        */}
        <br />
        {loading && <LinearProgress />}
        {!loading && <div style={{ height: 4 }} />}
        {/*
          Toolbar
        */}
        <Toolbar style={{ backgroundColor: 'white' }}>
          <Grid container direction="row" justifyContent="flex-end" alignItems="center">
            <Grid item>
              <Tooltip title={t('Create Report').toString()}>
                <IconButton
                  color="primary"
                  onClick={() => {
                    setOpenPopup(true);
                  }}
                >
                  <PlaylistAddIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={t('Export Excel').toString()}>
                <IconButton color="primary" onClick={() => {}}>
                  <CloudDownloadIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
        {/*
          Table
        */}
        <ReportTable
          data={data}
          startIndex={filter.pageSize * filter.pageIndex}
          onSelectReport={handleSelectReport}
        />
        {/*
          Pagination
        */}
        <Toolbar style={{ backgroundColor: 'white' }}>
          <Box
            style={{ width: '100%' }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Pagination
              color="primary"
              variant="outlined"
              shape="rounded"
              count={pageCount}
              page={filter.pageIndex + 1}
              onChange={(e: any, page: number) => {
                handlePageChange(page - 1);
              }}
            />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalRow}
              rowsPerPage={filter.pageSize}
              page={filter.pageIndex}
              onPageChange={(e: any, page: number) => {
                handlePageChange(page);
              }}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Toolbar>
      </div>

      {/*
        Create report modal
      */}
      <Popup
        title={t('Tổng hợp dữ liệu')}
        openPopup={openPopup}
        onClose={() => {
          setOpenPopup(false);
        }}
        fullWith={true}
        maxWidth={'lg'}
      >
        <CalculateReportPage />
      </Popup>
    </ThemeProvider>
  );
}
