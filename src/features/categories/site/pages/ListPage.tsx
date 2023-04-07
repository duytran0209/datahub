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
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CommonButton } from 'components/Common/CommonButton';
import Popup from 'components/Common/PopUp';
import { Site, ListParams} from 'models';
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { viVN } from '@mui/material/locale';
import { t } from 'i18next';
import SiteFilter from '../components/SiteFilter';
import SiteTable from '../components/SiteTable';
import {
  selectSiteFilter,
  selectSiteList,
  selectSiteLoading,
  selectSitePageCount,
  selectSiteTotalRow,
  siteActions,
} from '../siteSlice';
import siteApi from 'api/siteApi';
import SiteForm from '../components/SiteForm';

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

  const siteList = useAppSelector(selectSiteList);
  const pageCount = useAppSelector(selectSitePageCount);
  const totalRow = useAppSelector(selectSiteTotalRow);

  const filter = useAppSelector(selectSiteFilter);
  const loading = useAppSelector(selectSiteLoading);

  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const [openPopup, setOpenPopup] = useState(false);
  const [site, setSite] = useState<Site>();

  const initialValues: Site = {
    name: '',
    districtID:'',
    siteCode:'',
    ...site,
  } as Site;

  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(siteActions.fetchSiteList(filter));
  }, [dispatch, filter]);
  const handlePageChange = (e: any, page: number) => {
    setPageIndex(page);
    dispatch(
      siteActions.setFilter({
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
      siteActions.setFilter({
        ...filter,
        pageIndex,
        pageSize,
      })
    );
  };

  const handleRemoveSite = async (site: Site) => {
    try {
      //Remove site API
      await siteApi.remove(site?.id || '');
      toast.success('Remove site successfully!');
      // Trigger to re-fetch site list with current filter
      const newFilter = { ...filter };
      dispatch(siteActions.fetchSiteList(newFilter));
    } catch (error) {
      console.log('Failed to fetch site', error);
    }
  };

  const handleEditSite = async (site: Site) => {
    setSite(site);
    setOpenPopup(true);
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(siteActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(siteActions.setFilter(newFilter));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ padding: '15px' }}>
        {loading && <LinearProgress className={classes.loading} />}
        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Quản lý danh mục cơ sở
          </Typography>
        </Box>
        <Grid container mb={3}>
          <Grid xs={8} width="100%" md={8}>
            <SiteFilter
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
        <SiteTable siteList={siteList} onRemove={handleRemoveSite} onEdit={handleEditSite} />
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
          title={initialValues?.id ? t('Cập nhật cơ sở') : t('Tạo mới cơ sở')}
          subtitle="Vui lòng nhập đầy đủ các thông tin vào ô bên dưới"
          openPopup={openPopup}
          onClose={() => {
            setOpenPopup(false);
            setSite(undefined);
          }}
        >
          <SiteForm onClose={() => setOpenPopup(false)} initialValues={initialValues} />
        </Popup>
      </Container>
    </ThemeProvider>
  );
}
