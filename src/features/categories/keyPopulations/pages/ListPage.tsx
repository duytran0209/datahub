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
import keyPopulationApi from 'api/keyPopulationApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CommonButton } from 'components/Common/CommonButton';
import Popup from 'components/Common/PopUp';
import { t } from 'i18next';
import { KeyPopulation, ListParams } from 'models';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import KeyPopulationFilters from '../components/KeyPopulationFilters';
import KeyPopulationForm from '../components/KeyPopulationForm';
import KeyPopulationTable from '../components/KeyPopulationTable';
import {
  keyPopulationActions,
  selectKeyPopulationFilter,
  selectKeyPopulationList,
  selectKeyPopulationLoading,
  selectKeyPopulationPageCount,
  selectKeyPopulationTotalRow,
} from '../keyPopulationSlice';

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
  const keyPopulationList = useAppSelector(selectKeyPopulationList);
  const pageCount = useAppSelector(selectKeyPopulationPageCount);
  const totalRow = useAppSelector(selectKeyPopulationTotalRow);

  const filter = useAppSelector(selectKeyPopulationFilter);
  const loading = useAppSelector(selectKeyPopulationLoading);

  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const [openPopup, setOpenPopup] = useState(false);
  const [keyPopulation, setKeyPopulation] = useState<KeyPopulation>();

  const initialValues: KeyPopulation = {
    name: '',
    descriptions: '',
    ...keyPopulation,
  } as KeyPopulation;

  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(keyPopulationActions.fetchKeyPopulationList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    setPageIndex(page);
    dispatch(
      keyPopulationActions.setFilter({
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
      keyPopulationActions.setFilter({
        ...filter,
        pageIndex,
        pageSize,
      })
    );
  };
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(keyPopulationActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(keyPopulationActions.setFilter(newFilter));
  };

  const handleRemoveKeyPopulation = async (keyPopulation: KeyPopulation) => {
    try {
      // Remove keyPopulation API
      await keyPopulationApi.remove(keyPopulation?.id || '');

      toast.success('Remove keyPopulation successfully!');

      // Trigger to re-fetch keyPopulation list with current filter
      const newFilter = { ...filter };
      dispatch(keyPopulationActions.fetchKeyPopulationList(newFilter));
    } catch (error) {
      // Toast error
      console.log('Failed to fetch keyPopulation', error);
    }
  };

  const handleEditKeyPopulation = async (keyPopulation: KeyPopulation) => {
    setKeyPopulation(keyPopulation);
    setOpenPopup(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {loading && <LinearProgress className={classes.loading} />}

        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h5" fontWeight="bold">
            {t('Key population management')}
          </Typography>
        </Box>

        <Grid container mb={3} display="flex" flexDirection="row">
          <Grid xs={8} width="100%" md={8}>
            <KeyPopulationFilters
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

        <KeyPopulationTable
          keyPopulationList={keyPopulationList}
          onEdit={handleEditKeyPopulation}
          onRemove={handleRemoveKeyPopulation}
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
          title={initialValues?.id ? t('Update key population') : t('Create new key population')}
          subtitle={t('Fill in required fields below')}
          openPopup={openPopup}
          onClose={() => {
            setOpenPopup(false);
            setKeyPopulation(undefined);
          }}
        >
          <KeyPopulationForm onClose={() => setOpenPopup(false)} initialValues={initialValues} />
        </Popup>
      </Container>
    </ThemeProvider>
  );
}
