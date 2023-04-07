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
import genderApi from 'api/genderApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CommonButton } from 'components/Common/CommonButton';
import Popup from 'components/Common/PopUp';
import { t } from 'i18next';
import { Gender, ListParams } from 'models';
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import GenderFilters from '../components/GenderFilters';
import GenderForm from '../components/GenderForm';
import GenderTable from '../components/GenderTable';
import {
  genderActions,
  selectGenderFilter,
  selectGenderList,
  selectGenderLoading,
  selectGenderPageCount,
  selectGenderTotalRow,
} from '../genderSlice';

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

  const genderList = useAppSelector(selectGenderList);
  const pageCount = useAppSelector(selectGenderPageCount);
  const totalRow = useAppSelector(selectGenderTotalRow);

  const filter = useAppSelector(selectGenderFilter);
  const loading = useAppSelector(selectGenderLoading);

  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const [openPopup, setOpenPopup] = useState(false);
  const [gender, setGender] = useState<Gender>();

  const initialValues: Gender = {
    name: '',
    descriptions: '',
    ...gender,
  } as Gender;

  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(genderActions.fetchGenderList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    setPageIndex(page);
    dispatch(
      genderActions.setFilter({
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
      genderActions.setFilter({
        ...filter,
        pageIndex,
        pageSize,
      })
    );
  };
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(genderActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(genderActions.setFilter(newFilter));
  };

  const handleRemoveGender = async (gender: Gender) => {
    try {
      // Remove gender API
      await genderApi.remove(gender?.id || '');

      toast.success('Remove gender successfully!');

      // Trigger to re-fetch gender list with current filter
      const newFilter = { ...filter };
      dispatch(genderActions.fetchGenderList(newFilter));
    } catch (error) {
      // Toast error
      console.log('Failed to fetch gender', error);
    }
  };

  const handleEditGender = async (gender: Gender) => {
    setGender(gender);
    setOpenPopup(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {loading && <LinearProgress className={classes.loading} />}

        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Quản lý danh mục giới tính
          </Typography>
        </Box>

        <Grid container mb={3}>
          <Grid xs={8} width="100%" md={8}>
            <GenderFilters
              filter={filter}
              onChange={handleFilterChange}
              onSearchChange={handleSearchChange}
            />
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

        <GenderTable
          genderList={genderList}
          onEdit={handleEditGender}
          onRemove={handleRemoveGender}
        />

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
          title={initialValues?.id ? t('Update gender') : t('Create new gender')}
          subtitle="Vui lòng nhập đầy đủ các thông tin vào ô bên dưới"
          openPopup={openPopup}
          onClose={() => {
            setOpenPopup(false);
            setGender(undefined);
          }}
        >
          <GenderForm onClose={() => setOpenPopup(false)} initialValues={initialValues} />
        </Popup>
      </Container>
    </ThemeProvider>
  );
}
