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
import ageGroupApi from 'api/ageGroupApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CommonButton } from 'components/Common/CommonButton';
import Popup from 'components/Common/PopUp';
import { t } from 'i18next';
import { ListParams } from 'models';
import { AgeGroup } from 'models/ageGroup';
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  ageGroupActions,
  selectAgeGroupFilter,
  selectAgeGroupList,
  selectAgeGroupLoading,
  selectAgeGroupPageCount,
  selectAgeGroupTotalRow,
} from '../ageGroupSlice';
import AgeGroupFilter from '../components/AgeGroupFilter';
import AgeGroupForm from '../components/AgeGroupForm';
import AgeGroupTable from '../components/AgeGroupTable';

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

  const ageGroupList = useAppSelector(selectAgeGroupList);
  const pageCount = useAppSelector(selectAgeGroupPageCount);
  const totalRow = useAppSelector(selectAgeGroupTotalRow);

  const filter = useAppSelector(selectAgeGroupFilter);
  const loading = useAppSelector(selectAgeGroupLoading);

  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const [openPopup, setOpenPopup] = useState(false);
  const [ageGroup, setageGroup] = useState<AgeGroup>();

  const initialValues: AgeGroup = {
    name: '',
    order: '',
    lowestAge: '',
    olderAge: '',
    ...ageGroup,
  } as AgeGroup;

  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(ageGroupActions.fetchAgeGroupList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    setPageIndex(page);
    dispatch(
      ageGroupActions.setFilter({
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
      ageGroupActions.setFilter({
        ...filter,
        pageIndex,
        pageSize,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(ageGroupActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(ageGroupActions.setFilter(newFilter));
  };

  const handleRemoveAgeGroup = async (ageGroup: AgeGroup) => {
    try {
      //Remove ageGroup API
      await ageGroupApi.remove(ageGroup?.id || '');

      toast.success('Remove ageGroup Success');
      // Trigger to re-fetch gender list with current filter
      const newFilter = { ...filter };
      dispatch(ageGroupActions.fetchAgeGroupList(newFilter));
    } catch (error) {
      console.log('Failed to fetch ageGroup', error);
    }
  };

  const handleEdit = async (ageGroup: AgeGroup) => {
    setageGroup(ageGroup);
    setOpenPopup(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {loading && <LinearProgress className={classes.loading} />}
        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Quản lý danh mục nhóm tuổi
          </Typography>
        </Box>

        <Grid container mb={3}>
          <Grid xs={8} width="100%" md={8}>
            <AgeGroupFilter
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

        <AgeGroupTable
          ageGroupList={ageGroupList}
          onRemove={handleRemoveAgeGroup}
          onEdit={handleEdit}
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
          title={initialValues?.id ? t('Cập nhật nhóm tuổi') : t('Tạo mới nhóm tuổi')}
          subtitle="Vui lòng nhập đầy đủ các thông tin vào ô bên dưới"
          openPopup={openPopup}
          onClose={() => {
            setOpenPopup(false);
            setageGroup(undefined);
          }}
        >
          <AgeGroupForm onClose={() => setOpenPopup(false)} initialValues={initialValues} />
        </Popup>
      </Container>
    </ThemeProvider>
  );
}
