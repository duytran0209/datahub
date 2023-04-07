import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Pagination } from '@mui/lab';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TablePagination,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ListParams } from 'models';
import React, { ChangeEvent, DragEvent, useEffect, useState } from 'react';
// import {
//   prepActions,
//   selectPrepFilter,
//   selectPrepList,
//   selectPrepLoading,
//   selectPrepPageCount,
//   selectPrepTotalRow,
// } from '../prepSlice';
import { viVN } from '@mui/material/locale';
import prepApi from 'api/prepApi';
import { FileUpload, UploadFileStatus } from 'components/Common/FileUpload';
import LinearProgressWithLabel from 'components/Common/LinearProgressWithLabel';
import { t } from 'i18next';
import { stringUtils } from 'utils';
import PrEPFilter from '../components/PrEPFilter';
import PrepTable from '../components/PrEPTable';
import {
  prepActions,
  selectPrepFilter,
  selectPrepList,
  selectPrepLoading,
  selectPrepPageCount,
  selectPrepTotalRow,
} from '../prepSlice';
import { selectSiteList, siteActions } from 'features/categories/site/siteSlice';

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
  const data = useAppSelector(selectPrepList);
  const totalRow = useAppSelector(selectPrepTotalRow);
  const pageCount = useAppSelector(selectPrepPageCount);
  const filter = useAppSelector(selectPrepFilter);
  const loading = useAppSelector(selectPrepLoading);
  const siteList = useAppSelector(selectSiteList);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFileStatus[]>();

  const [onUpload, setOnUpload] = useState<boolean>();
  const [doneUpload, setDoneUpload] = useState<boolean>();
  const [progress, setProgress] = useState<number>();

  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(
      siteActions.fetchSiteList({
        pageIndex: 0,
        pageSize: 1000000,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(prepActions.fetchPrepList(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    const checkOnUpload = () => {
      return (
        uploadFiles && uploadFiles.length > 0 && uploadFiles.filter((_) => _.status).length > 0
      );
    };

    const checkDoneUpload = () => {
      return (
        uploadFiles &&
        uploadFiles.length > 0 &&
        uploadFiles.filter((_) => _.status === 2 || _.status === 3).length === uploadFiles.length
      );
    };

    const calcProgress = () => {
      if (uploadFiles && uploadFiles.length > 0) {
        let done = uploadFiles.filter((_) => _.status === 2 || _.status === 3).length;
        // let total = uploadFiles.length;
        return done;
      }
      return 0;
    };
    setOnUpload(checkOnUpload());
    setDoneUpload(checkDoneUpload());
    setProgress(calcProgress());
  }, [uploadFiles]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      prepActions.setFilter({
        ...filter,
        pageIndex: 0,
        pageSize: parseInt(event.target.value, 10),
      })
    );
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(prepActions.setFilter(newFilter));
  };

  const handleFileChange = (files: FileList) => {
    let items: UploadFileStatus[] = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      items.push({
        succeed: undefined,
        file: file,
        index: index,
      } as UploadFileStatus);
    }
    setUploadFiles(items);
  };

  const handleUploadStatus = (index: number, status: number) => {
    console.log(index, status);
    if (uploadFiles) {
      let clone = [...uploadFiles];
      clone[index].status = status;
      setUploadFiles(clone);
    }
  };

  const handleCloseDrawer = () => {
    if (onUpload) {
      if (doneUpload) {
        setOpenDrawer(false);
        setUploadFiles(undefined);
      }
      return;
    }

    setOpenDrawer(false);
    setUploadFiles(undefined);
  };

  const handlePageChange = (page: number) => {
    dispatch(
      prepActions.setFilter({
        ...filter,
        pageIndex: page,
      })
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: 20 }}>
        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h5" fontWeight="bold">
            {t('PrEP Histories management')}
          </Typography>
        </Box>
        <PrEPFilter filter={filter} onChange={handleFilterChange} siteList={siteList} />
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
        <PrepTable data={data} startIndex={filter.pageSize * filter.pageIndex} />
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
                  {onUpload ? '' : t('Select a file to import')}
                </Typography>
              )}

              {!loading && !onUpload && (
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
                    multiple={true}
                    onChange={function (event: ChangeEvent<HTMLInputElement>): void {
                      if (event.target.files !== null && event.target?.files?.length > 0) {
                        handleFileChange(event.target.files);
                      }
                    }}
                    onDrop={function (event: DragEvent<HTMLElement>): void {
                      handleFileChange(event.dataTransfer.files);
                    }}
                  />
                </div>
              )}

              {uploadFiles && (
                /*
                  List of file
                 */
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    margin: '15px',
                    textAlign: 'center',
                  }}
                >
                  {onUpload && (
                    <div
                      style={{
                        marginBottom: '15px',
                      }}
                    >
                      <LinearProgressWithLabel value={progress ?? 0} total={uploadFiles.length} />
                    </div>
                  )}
                  <List
                    sx={{
                      width: '100%',
                      maxHeight: onUpload ? 'calc(100vh - 190px)' : 'calc(100vh - 380px)',
                      overflow: 'auto',
                    }}
                  >
                    {uploadFiles.map((item) => (
                      <ListItem
                        key={item.file.name}
                        secondaryAction={
                          item.status === 1 ? (
                            <CircularProgress size={15} />
                          ) : item.status === 2 ? (
                            <CheckCircleIcon color="success" />
                          ) : item.status === 3 ? (
                            <ErrorIcon color="error" />
                          ) : (
                            ''
                          )
                        }
                        style={{
                          backgroundColor:
                            item.status === 2 ? '#eaf6f0' : item.status === 3 ? '#fbe8e8' : '',
                        }}
                      >
                        <ListItemAvatar>
                          <InsertDriveFileIcon
                            color={
                              item.status === 2
                                ? 'success'
                                : item.status === 3
                                ? 'error'
                                : 'inherit'
                            }
                          />
                        </ListItemAvatar>
                        <ListItemText primary={stringUtils.getName(item.file.name, 38)} />
                      </ListItem>
                    ))}
                  </List>
                </div>
              )}
            </div>
            <div
              style={{
                height: '80px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f4f7fa',
              }}
            >
              {onUpload && (
                <>
                  <Button
                    style={{
                      marginLeft: '25px',
                    }}
                    onClick={() => {
                      handleCloseDrawer();
                    }}
                    variant="contained"
                    disabled={!doneUpload}
                  >
                    {t('done')}
                  </Button>
                </>
              )}
              {!onUpload && (
                <>
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
                    disabled={!uploadFiles || loading}
                    variant="contained"
                    onClick={async () => {
                      if (uploadFiles) {
                        for (let index = 0; index < uploadFiles.length; index++) {
                          const item = uploadFiles[index];
                          try {
                            handleUploadStatus(index, 1);
                            const response = await prepApi.importFile(item.file);
                            if (response.succeed) {
                              handleUploadStatus(index, 2);
                            } else {
                              handleUploadStatus(index, 3);
                            }
                          } catch (error) {
                            handleUploadStatus(index, 3);
                          }
                          setUploadFiles(uploadFiles);
                        }
                        handleFilterChange({ ...filter });
                      }
                    }}
                  >
                    {t('upload')}
                  </Button>
                </>
              )}
            </div>
          </div>
        </Drawer>
      </div>
    </ThemeProvider>
  );
}
