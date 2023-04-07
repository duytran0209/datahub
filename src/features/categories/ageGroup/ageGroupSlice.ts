import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse } from 'models';
import { AgeGroup } from 'models/ageGroup';


export interface AgeGroupState {
  loading: boolean;
  list: AgeGroup[];
  filter: ListParams;
  pageCount: number;
  totalRow: number;
}

const initialState: AgeGroupState = {
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

const ageGroupSlice = createSlice({
  name: 'ageGroup',
  initialState,
  reducers: {
    fetchAgeGroupList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchAgeGroupListSuccess(state, action: PayloadAction<ListResponse<AgeGroup>>) {
      state.list = action.payload.data;
      state.pageCount = action.payload.pageCount;
      state.totalRow = action.payload.totalRow;
      state.loading = false;
    },
    fetchAgeGroupListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      console.log(action.payload);

      state.filter = {
        ...action.payload,
        pageIndex: action.payload.pageIndex > 0 ? action.payload.pageIndex - 1 : 0,
        searchAgeGrName: action.payload.searchAgeGrName,
      };
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

// Actions
export const ageGroupActions = ageGroupSlice.actions;
// Selectors
export const selectAgeGroupList = (state: RootState) => state.ageGroup.list;
export const selectAgeGroupLoading = (state: RootState) => state.ageGroup.loading;
export const selectAgeGroupFilter = (state: RootState) => state.ageGroup.filter;
export const selectAgeGroupPageCount = (state: RootState) => state.ageGroup.pageCount;
export const selectAgeGroupTotalRow = (state: RootState) => state.ageGroup.totalRow;

// Reducer
const ageGroupReducer = ageGroupSlice.reducer;
export default ageGroupReducer;
