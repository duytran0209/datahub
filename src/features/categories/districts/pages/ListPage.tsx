import AddIcon from '@mui/icons-material/Add';
import { Pagination } from '@mui/lab';
import {
  Box,
  Container,
  Grid,
  LinearProgress,
  TablePagination,
  Theme,
  Typography,
} from '@mui/material';
import { viVN } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import districtsApi from 'api/districtsApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CommonButton } from 'components/Common/CommonButton';
import Popup from 'components/Common/PopUp';
import { t } from 'i18next';
import { Districts, ListParams } from 'models';
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import DistrictsFilter from '../components/DistrictsFilter';
import DistrictsForm from '../components/DistrictsForm';
import DistrictsTable from '../components/DistrictsTable';
import {
  districtsActions,
  selectDistrictsFilter,
  selectDistrictsList,
  selectDistrictsLoading,
  selectDistrictsPageCount,
  selectDistrictsTotalRow,
} from '../districtsSlice';

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

  const districtsList = useAppSelector(selectDistrictsList);
  const pageCount = useAppSelector(selectDistrictsPageCount);
  const totalRow = useAppSelector(selectDistrictsTotalRow);

  const filter = useAppSelector(selectDistrictsFilter);
  const loading = useAppSelector(selectDistrictsLoading);

  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const [openPopup, setOpenPopup] = useState(false);
  const [districts, setDistricts] = useState<Districts>();

  const initialValues: Districts = {
    provinceCode:'',
    code:'',
    type:'',
    name:'',
    pathWithType:'',
    slug:'',
    ...districts,
  } as Districts;

  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(districtsActions.fetchDistrictsList(filter));
  }, [dispatch, filter]);


  const handlePageChange = (e: any, page: number) => {
    setPageIndex(page);
    dispatch(
      districtsActions.setFilter({
        ...filter,
        pageIndex: page,
        pageSize,
      })
    );
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageIndex(1);
    dispatch(
      districtsActions.setFilter({
        ...filter,
        pageIndex,
        pageSize,
      })
    );
  };


  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Quản lý danh mục quận huyện
          </Typography>
        </Box>
        <Grid container mb={3}>
          <Grid xs={8} width="100%" md={8}>
            <DistrictsFilter/>
          </Grid>
          <Grid
            width="100%"
            xs={4}
            md={4}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <CommonButton onClick={() => setOpenPopup(true)} variant="contained">
              <AddIcon />
            </CommonButton>
          </Grid>
        </Grid>
        <DistrictsTable districtsList={districtsList}/>
        <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
          <Pagination
            color="primary"
            variant="outlined"
            shape="rounded"
            defaultPage={1}
            count={pageCount}
            page={pageIndex}
            onChange={handlePageChange}
          />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalRow}
            rowsPerPage={pageSize}
            page={pageIndex - 1}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
        <Popup
          title={initialValues?.id ? t('Cập nhật Quận/Huyện') : t('Tạo mới Quận/Huyện')}
          subtitle="Vui lòng nhập đầy đủ các thông tin vào ô bên dưới"
          openPopup={openPopup}
          onClose={() => {
            setOpenPopup(false);
            setDistricts(undefined);
          }}
        >
         <DistrictsForm onClose={()=>setOpenPopup(false)} initialValues={initialValues}/>
        </Popup>
      </Container>
    </ThemeProvider>
  );
}
