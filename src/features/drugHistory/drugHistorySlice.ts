import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse } from 'models';
import { DrugHistory } from 'models/drugHistory';

export interface DrugHistoryState {
  loading: boolean;
  list: DrugHistory[];
  filter: ListParams;
  pageCount: number;
  totalRow: number;
}

const initialState: DrugHistoryState = {
  loading: false,
  list: [],
  filter: {
    pageIndex: 0,
    pageSize: 10,
    name: '',
    reportingPeriod: 1,
  },
  pageCount: 0,
  totalRow: 0,
};

const drugHistorySlice = createSlice({
  name: 'drugHistory',
  initialState,
  reducers: {
    fetchDrugHistoryList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchDrugHistoryListSuccess(state, action: PayloadAction<ListResponse<DrugHistory>>) {
      state.list = action.payload.data;
      state.totalRow = action.payload.totalRow;
      state.pageCount = action.payload.pageCount;
      state.loading = false;
    },
    fetchDrugHistoryListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

// Actions
export const drugHistoryActions = drugHistorySlice.actions;

// Selectors
export const selectDrugHistoryList = (state: RootState) => state.drugHistory.list;
export const selectDrugHistoryLoading = (state: RootState) => state.drugHistory.loading;
export const selectDrugHistoryFilter = (state: RootState) => state.drugHistory.filter;
export const selectDrugHistoryTotalRow = (state: RootState) => state.drugHistory.totalRow;
export const selectDrugHistoryPageCount = (state: RootState) => state.drugHistory.pageCount;

// Reducer
const drugHistoryReducer = drugHistorySlice.reducer;
export default drugHistoryReducer;
