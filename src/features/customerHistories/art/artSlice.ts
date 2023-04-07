import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ART, ListParams, ListResponse } from 'models';

export interface ARTState {
  loading: boolean;
  list: ART[];
  filter: ListParams;
  pageCount: number;
  totalRow: number;
}

const initialState: ARTState = {
  loading: false,
  list: [],
  filter: {
    pageIndex: 0,
    pageSize: 10,
    searchName: '',
  },
  pageCount: 0,
  totalRow: 0,
};

const artSlice = createSlice({
  name: 'art',
  initialState,
  reducers: {
    fetchARTList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchARTListSuccess(state, action: PayloadAction<ListResponse<ART>>) {
      state.list = action.payload.data;
      state.totalRow = action.payload.totalRow;
      state.pageCount = action.payload.pageCount;
      state.loading = false;
    },
    fetchARTListFailed(state) {
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
export const artActions = artSlice.actions;

// Selectors
export const selectARTList = (state: RootState) => state.art.list;
export const selectARTLoading = (state: RootState) => state.art.loading;
export const selectARTFilter = (state: RootState) => state.art.filter;
export const selectARTTotalRow = (state: RootState) => state.art.totalRow;
export const selectARTPageCount = (state: RootState) => state.art.pageCount;

// Reducer
const artReducer = artSlice.reducer;
export default artReducer;
