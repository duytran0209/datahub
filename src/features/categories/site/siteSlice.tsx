import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, Site } from 'models';

export interface SiteState {
  loading: boolean;
  list: Site[];
  filter: ListParams;
  pageCount: number;
  totalRow: number;
}

const initialState: SiteState = {
  loading: false,
  list: [],
  filter: {
    pageIndex: 0,
    pageSize: 10,
    search: '',
  },
  pageCount: 0,
  totalRow: 0,
};

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    fetchSiteList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchSiteListSuccess(state, action: PayloadAction<ListResponse<Site>>) {
      state.list = action.payload.data;
      state.pageCount = action.payload.pageCount;
      state.totalRow = action.payload.totalRow;
      state.loading = false;
    },
    fetchSiteListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      console.log(action.payload);

      state.filter = {
        ...action.payload,
        pageIndex: action.payload.pageIndex > 0 ? action.payload.pageIndex - 1 : 0,
        searchSite: action.payload.searchSite,
      };
    },

    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

// Actions
export const siteActions = siteSlice.actions;

// Selectors
export const selectSiteList = (state: RootState) => state.site.list;
export const selectSiteLoading = (state: RootState) => state.site.loading;
export const selectSiteFilter = (state: RootState) => state.site.filter;
export const selectSitePageCount = (state: RootState) => state.site.pageCount;
export const selectSiteTotalRow = (state: RootState) => state.site.totalRow;

// Reducer
const siteReducer = siteSlice.reducer;
export default siteReducer;
