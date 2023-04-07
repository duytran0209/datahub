import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationParams, Drug } from 'models';

export interface DrugState {
  loading: boolean;
  list: Drug[];
  filter: ListParams;
  pageCount: number;
  totalRow: number;
}

const initialState: DrugState = {
  loading: false,
  list: [],
  filter: {
    pageIndex: 0,
    pageSize: 10,
    name: '',
  },
  pageCount: 0,
  totalRow: 0,
};

const drugSlice = createSlice({
  name: 'drug',
  initialState,
  reducers: {
    fetchDrugList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchDrugListSuccess(state, action: PayloadAction<ListResponse<Drug>>) {
      state.list = action.payload.data;
      state.totalRow = action.payload.totalRow;
      state.pageCount = action.payload.pageCount;
      state.loading = false;
    },
    fetchDrugListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },

    setFilterWithDebounce(state, action: PayloadAction<ListParams>) { },
  },
});

// Actions
export const drugActions = drugSlice.actions;

// Selectors
export const selectDrugList = (state: RootState) => state.drug.list;
export const selectDrugLoading = (state: RootState) => state.drug.loading;
export const selectDrugFilter = (state: RootState) => state.drug.filter;
export const selectDrugTotalRow = (state: RootState) => state.drug.totalRow;
export const selectDrugPageCount = (state: RootState) => state.drug.pageCount;

// Reducer
const drugReducer = drugSlice.reducer;
export default drugReducer;
