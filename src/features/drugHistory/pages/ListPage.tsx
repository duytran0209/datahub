import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
  Pagination,
  TablePagination,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { viVN } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import drugHistoryApi from 'api/drugHistoryApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FileUpload } from 'components/Common/FileUpload';
import { t } from 'i18next';
import { DrugHistory, ListParams } from 'models';
import React, { ChangeEvent, DragEvent, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import DrugHistoryFitlers from '../components/DrugHistoryFilters';
import DrugHistoryTable from '../components/DrugHistoryTable';
import {
  drugHistoryActions,
  selectDrugHistoryFilter,
  selectDrugHistoryList,
  selectDrugHistoryLoading,
  selectDrugHistoryPageCount,
  selectDrugHistoryTotalRow,
} from '../drugHistorySlice';

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
  const match = useRouteMatch();
  const history = useHistory();

  const drugHistoryList = useAppSelector(selectDrugHistoryList);
  const totalRow = useAppSelector(selectDrugHistoryTotalRow);
  const pageCount = useAppSelector(selectDrugHistoryPageCount);
  const filter = useAppSelector(selectDrugHistoryFilter);
  const loading = useAppSelector(selectDrugHistoryLoading);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();

  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(drugHistoryActions.fetchDrugHistoryList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (page: number) => {
    dispatch(
      drugHistoryActions.setFilter({
        ...filter,
        pageIndex: page,
      })
    );
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      drugHistoryActions.setFilter({
        ...filter,
        pageIndex: 0,
        pageSize: parseInt(event.target.value, 10),
      })
    );
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(drugHistoryActions.setFilter(newFilter));
  };

  const handleRemove = async (drugHistory: DrugHistory) => {
    try {
      await drugHistoryApi.remove(drugHistory?.id || '');
      toast.success(t('Remove drug successfully!'));
      const newFilter = { ...filter };
      dispatch(drugHistoryActions.fetchDrugHistoryList(newFilter));
    } catch (error) {
      console.log('Failed to fetch drug', error);
    }
  };

  const handleSelect = async (drugHistory: DrugHistory) => {
    history.push(`${match.url}/${drugHistory.id}`);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedFile(undefined);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: 20 }}>
        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h5" fontWeight="bold">
            {t('Drug use and storage report')}
          </Typography>
        </Box>
        <DrugHistoryFitlers filter={filter} onChange={handleFilterChange} />

        <br />
        {loading && <LinearProgress />}
        {!loading && <div style={{ height: 4 }} />}
        <Toolbar style={{ backgroundColor: 'white' }}>
          <Grid container direction="row" justifyContent="flex-end" alignItems="center">
            <Grid item>
              <Tooltip title={t('Import Excel').toString()}>
                <IconButton
                  color="primary"
                  onClick={() => {
                    setOpenDrawer(true);
                  }}
                >
                  <UploadFileIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
        <DrugHistoryTable
          data={drugHistoryList}
          onRemove={handleRemove}
          onSelect={handleSelect}
          startIndex={filter.pageSize * filter.pageIndex}
        />
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

        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={() => {
            handleCloseDrawer();
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'space-between',
              justifyContent: 'space-between',
              height: '100%',
              width: '450px',
            }}
          >
            <div>
              <div
                style={{
                  height: '30px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '10px',
                }}
              >
                <Typography>{t('Import file')}</Typography>
                <IconButton
                  onClick={() => {
                    handleCloseDrawer();
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <Divider />
              {!loading && (
                <Typography
                  variant="h6"
                  style={{
                    marginTop: '25px',
                    marginLeft: '15px',
                  }}
                >
                  {t('Select a file to import')}
                </Typography>
              )}

              {!loading && (
                <div
                  style={{
                    border: '1px solid #e2e6f0',
                    height: '152px',
                    margin: '15px',
                    backgroundColor: '#fbfcfd',
                  }}
                >
                  <FileUpload
                    width="420px"
                    height="150px"
                    hoverLabel={t('Click or drag to upload file').toString()}
                    dropLabel={t('Drop file here').toString()}
                    accept={
                      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                    }
                    onChange={function (event: ChangeEvent<HTMLInputElement>): void {
                      if (event.target.files !== null && event.target?.files?.length > 0) {
                        setSelectedFile(event.target.files[0]);
                      }
                    }}
                    onDrop={function (event: DragEvent<HTMLElement>): void {
                      setSelectedFile(event.dataTransfer.files[0]);
                    }}
                  />
                </div>
              )}
              {loading && <LinearProgress />}
              {selectedFile && !loading && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    margin: '15px',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body1" align="center">
                    {`${t('Filename: ')}${selectedFile.name}`}
                  </Typography>
                  <CloseIcon
                    onClick={() => {
                      setSelectedFile(undefined);
                    }}
                  />
                </div>
              )}
            </div>
            <div
              style={{
                height: '60px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f4f7fa',
              }}
            >
              <Button
                style={{
                  marginLeft: '25px',
                }}
                onClick={() => {
                  handleCloseDrawer();
                }}
                disabled={loading}
              >
                {t('cancel')}
              </Button>
              <Button
                style={{
                  marginRight: '25px',
                }}
                disabled={!selectedFile || loading}
                variant="contained"
                onClick={async () => {
                  if (selectedFile) {
                    dispatch(drugHistoryActions.setLoading(true));
                    try {
                      const response = await drugHistoryApi.importFile(selectedFile);
                      if (response.succeed) {
                        setOpenDrawer(false);
                        toast.success(t('Import Succeed').toString());
                      } else {
                      }
                    } catch (error) {
                      console.log(error);
                      toast.error(t('Import fail').toString());
                    }
                    dispatch(drugHistoryActions.setLoading(false));
                  }
                }}
              >
                {t('upload')}
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    </ThemeProvider>
  );
}
