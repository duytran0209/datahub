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
import { createStyles, makeStyles } from '@mui/styles';
import customerApi from 'api/customerApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CommonButton } from 'components/Common/CommonButton';
import Popup from 'components/Common/PopUp';
import { Customer, ListParams } from 'models';
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomerFilters from '../components/CustomerFilters';
import CustomerForm from '../components/CustomerForm';
import CustomerTable from '../components/CustomerTable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  customerActions,
  selectCustomerFilter,
  selectCustomerList,
  selectCustomerLoading,
  selectCustomerPageCount,
  selectCustomerTotalRow,
} from '../customerSlice';
import { viVN } from '@mui/material/locale';
import { t } from 'i18next';

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

  const customerList = useAppSelector(selectCustomerList);
  const totalRow = useAppSelector(selectCustomerTotalRow);
  const pageCount = useAppSelector(selectCustomerPageCount);
  const filter = useAppSelector(selectCustomerFilter);
  const loading = useAppSelector(selectCustomerLoading);

  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const [openPopup, setOpenPopup] = useState(false);
  const [customer, setCustomer] = useState<Customer>();

  const initialValues: Customer = {
    name: '',
    unit: '',
    order: '',
    ...customer,
  } as Customer;

  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    console.log(filter);
    dispatch(customerActions.fetchCustomerList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    var pageIndex = page - 1;
    setPageIndex(page);
    dispatch(
      customerActions.setFilter({
        ...filter,
        pageIndex,
      })
    );
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageIndex(1);
    dispatch(
      customerActions.setFilter({
        ...filter,
        pageIndex,
        pageSize,
      })
    );
  };
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(customerActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(customerActions.setFilter(newFilter));
  };

  const handleRemoveCustomer = async (customer: Customer) => {
    try {
      const newFilter = { ...filter };
      dispatch(customerActions.fetchCustomerList(newFilter));
    } catch (error) {
      console.log('Failed to fetch customer', error);
    }
  };
  const CustomerList = useAppSelector(selectCustomerList);
  const handleEditCustomer = async (customer: Customer) => {
    history.push(`${match.url}/${customer.id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '15px' }}>
        {loading && <LinearProgress className={classes.loading} />}
        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h5" fontWeight="bold">
            {t('List Customer')}
          </Typography>
        </Box>
        <Grid container mb={3}>
          <Grid xs={8} width="100%" md={8}>
            <CustomerFilters
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
        <CustomerTable ItemsList={customerList} />
        <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
          <Pagination
            color="primary"
            variant="outlined"
            shape="rounded"
            count={Math.ceil(totalRow / pageSize)}
            page={pageIndex}
            onChange={handlePageChange}
          />
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalRow}
            rowsPerPage={pageSize}
            page={pageIndex - 1}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
        {/* <Popup title="Tạo mới thuốc" openPopup={openPopup} onClose={() => setOpenPopup(false)}>
          <CustomerForm onClose={() => setOpenPopup(false)} initialValues={initialValues} />
        </Popup> */}
      </div>
    </ThemeProvider>
  );
}
