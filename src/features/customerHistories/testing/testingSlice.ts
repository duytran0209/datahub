import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, Testing } from 'models';

export interface TestingState {
  loading: boolean;
  list: Testing[];
  filter: ListParams;
  pageCount: number;
  totalRow: number;
}

const initialState: TestingState = {
  loading: false,
  list: [],
  filter: {
    pageIndex: 0,
    pageSize: 10,
  },
  pageCount: 0,
  totalRow: 0,
};

const testingSlice = createSlice({
  name: 'testing',
  initialState,
  reducers: {
    fetchTestingList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchTestingListSuccess(state, action: PayloadAction<ListResponse<Testing>>) {
      state.list = action.payload.data;
      state.totalRow = action.payload.totalRow;
      state.pageCount = action.payload.pageCount;
      state.loading = false;
    },
    fetchTestingListFailed(state) {
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
export const testingActions = testingSlice.actions;

// Selectors
export const selectTestingList = (state: RootState) => state.testing.list;
export const selectTestingLoading = (state: RootState) => state.testing.loading;
export const selectTestingFilter = (state: RootState) => state.testing.filter;
export const selectTestingTotalRow = (state: RootState) => state.testing.totalRow;
export const selectTestingPageCount = (state: RootState) => state.testing.pageCount;

// Reducer
const testingReducer = testingSlice.reducer;
export default testingReducer;
