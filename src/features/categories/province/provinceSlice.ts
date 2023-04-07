import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, Province } from 'models';

export interface ProvinceState {
  loading: boolean;
  list: Province[];
  filter: ListParams;
  pageCount: number;
  totalRow: number;
}

const initialState: ProvinceState = {
  loading: false,
  list: [],
  filter: {
    pageIndex: 0,
    pageSize: 10,
    search: '',
    name: '',
  },
  pageCount: 0,
  totalRow: 0,
};

const provinceSlice = createSlice({
  name: 'province',
  initialState,
  reducers: {
    fetchProvinceList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchProvinceListSuccess(state, action: PayloadAction<ListResponse<Province>>) {
      state.list = action.payload.data;
      state.totalRow = action.payload.totalRow;
      state.pageCount = action.payload.pageCount;
      state.loading = false;
    },

    fetchProvinceListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },

    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

// Actions
export const provinceActions = provinceSlice.actions;

// Selectors
export const selectProvinceList = (state: RootState) => state.province.list;
export const selectProvinceLoading = (state: RootState) => state.province.loading;
export const selectProvinceFilter = (state: RootState) => state.province.filter;
export const selectProvincePageCount = (state: RootState) => state.province.pageCount;
export const selectProvinceTotalRow = (state: RootState) => state.province.totalRow;

// Reducer
const provinceReducer = provinceSlice.reducer;
export default provinceReducer;
