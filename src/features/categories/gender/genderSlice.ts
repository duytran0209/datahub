import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, Gender } from 'models';

export interface GenderState {
  loading: boolean;
  list: Gender[];
  filter: ListParams;
  pageCount: number;
  totalRow: number;
}

const initialState: GenderState = {
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

const genderSlice = createSlice({
  name: 'gender',
  initialState,
  reducers: {
    fetchGenderList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchGenderListSuccess(state, action: PayloadAction<ListResponse<Gender>>) {
      state.list = action.payload.data;
      state.pageCount = action.payload.pageCount;
      state.totalRow = action.payload.totalRow;
      state.loading = false;
    },
    
    fetchGenderListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      console.log(action.payload);

      state.filter = {
        ...action.payload,
        pageIndex: action.payload.pageIndex > 0 ? action.payload.pageIndex - 1 : 0,
        searchGender: action.payload.searchGender,
      };
    },

    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

// Actions
export const genderActions = genderSlice.actions;

// Selectors
export const selectGenderList = (state: RootState) => state.gender.list;
export const selectGenderLoading = (state: RootState) => state.gender.loading;
export const selectGenderFilter = (state: RootState) => state.gender.filter;
export const selectGenderPageCount = (state: RootState) => state.gender.pageCount;
export const selectGenderTotalRow = (state: RootState) => state.gender.totalRow;

// Reducer
const genderReducer = genderSlice.reducer;
export default genderReducer;
