import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, Prep } from 'models';

export interface PrepState {
  loading: boolean;
  list: Prep[];
  filter: ListParams;
  pageCount: number;
  totalRow: number;
}

const initialState: PrepState = {
  loading: false,
  list: [],
  filter: {
    pageIndex: 0,
    pageSize: 10,
  },
  pageCount: 0,
  totalRow: 0,
};

const prepSlice = createSlice({
  name: 'prep',
  initialState,
  reducers: {
    fetchPrepList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchPrepListSuccess(state, action: PayloadAction<ListResponse<Prep>>) {
      state.list = action.payload.data;
      state.totalRow = action.payload.totalRow;
      state.pageCount = action.payload.pageCount;
      state.loading = false;
    },
    fetchPrepListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

// Actions
export const prepActions = prepSlice.actions;

// Selectors
export const selectPrepList = (state: RootState) => state.prep.list;
export const selectPrepLoading = (state: RootState) => state.prep.loading;
export const selectPrepFilter = (state: RootState) => state.prep.filter;
export const selectPrepTotalRow = (state: RootState) => state.prep.totalRow;
export const selectPrepPageCount = (state: RootState) => state.prep.pageCount;

// Reducer
const prepReducer = prepSlice.reducer;
export default prepReducer;
