import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, KeyPopulation } from 'models';

export interface KeyPopulationState {
  loading: boolean;
  list: KeyPopulation[];
  filter: ListParams;
  pageCount: number;
  totalRow: number;
}

const initialState: KeyPopulationState = {
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

const keyPopulationSlice = createSlice({
  name: 'keyPopulation',
  initialState,
  reducers: {
    fetchKeyPopulationList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchKeyPopulationListSuccess(state, action: PayloadAction<ListResponse<KeyPopulation>>) {
      state.list = action.payload.data;
      state.pageCount = action.payload.pageCount;
      state.totalRow = action.payload.totalRow;
      state.loading = false;
    },
    fetchKeyPopulationListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = {
        ...action.payload,
        pageIndex: action.payload.pageIndex > 0 ? action.payload.pageIndex - 1 : 0,
        searchName: action.payload.searchName,
      };
    },

    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

// Actions
export const keyPopulationActions = keyPopulationSlice.actions;

// Selectors
export const selectKeyPopulationList = (state: RootState) => state.keyPopulation.list;
export const selectKeyPopulationLoading = (state: RootState) => state.keyPopulation.loading;
export const selectKeyPopulationFilter = (state: RootState) => state.keyPopulation.filter;
export const selectKeyPopulationPageCount = (state: RootState) => state.keyPopulation.pageCount;
export const selectKeyPopulationTotalRow = (state: RootState) => state.keyPopulation.totalRow;

// Reducer
const keyPopulationReducer = keyPopulationSlice.reducer;
export default keyPopulationReducer;
