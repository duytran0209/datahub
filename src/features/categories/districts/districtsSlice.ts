import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, Districts } from 'models';

export interface DistrictsState {
  loading: boolean;
  list: Districts[];
  filter: ListParams;
  pageCount: number;
  totalRow: number;
}

const initialState: DistrictsState = {
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

const districtsSlice = createSlice({
  name: 'districts',
  initialState,
  reducers: {
    fetchDistrictsList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchDistrictsListSuccess(state, action: PayloadAction<ListResponse<Districts>>) {
      state.list = action.payload.data;
      state.pageCount = action.payload.pageCount;
      state.totalRow = action.payload.totalRow;
      state.loading = false;
    },
    
    fetchDistrictsListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      console.log(action.payload);

      state.filter = {
        ...action.payload,
        pageIndex: action.payload.pageIndex > 0 ? action.payload.pageIndex - 1 : 0,
        searchDistricts: action.payload.searchDistricts,
      };
    },

    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

// Actions
export const districtsActions = districtsSlice.actions;

// Selectors
export const selectDistrictsList = (state: RootState) => state.districts.list;
export const selectDistrictsLoading = (state: RootState) => state.districts.loading;
export const selectDistrictsFilter = (state: RootState) => state.districts.filter;
export const selectDistrictsPageCount = (state: RootState) => state.districts.pageCount;
export const selectDistrictsTotalRow = (state: RootState) => state.districts.totalRow;

// Reducer
const districtsReducer = districtsSlice.reducer;
export default districtsReducer;
