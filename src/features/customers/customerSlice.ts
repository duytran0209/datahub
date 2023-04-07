import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  ListParams,
  ListResponse,
  PaginationParams,
  Customer
} from 'models';

export interface CustomerState {
  loading: boolean;
  list: Customer[];
  filter: ListParams;
  pageCount: number;
  totalRow: number;
}

const initialState: CustomerState = {
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

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    fetchCustomerList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchCustomerListSuccess(state, action: PayloadAction<ListResponse<Customer>>) {
      state.list = action.payload.data;
      state.totalRow = action.payload.totalRow;
      state.pageCount = action.payload.pageCount;
      state.loading = false;
    },
    fetchCustomerListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) { },
  },
});

// Actions
export const customerActions = customerSlice.actions;

// Selectors
export const selectCustomerList = (state: RootState) => state.customer.list;
export const selectCustomerLoading = (state: RootState) => state.customer.loading;
export const selectCustomerFilter = (state: RootState) => state.customer.filter;
export const selectCustomerTotalRow = (state: RootState) => state.customer.totalRow;
export const selectCustomerPageCount = (state: RootState) => state.customer.pageCount;

// Reducer
const customerReducer = customerSlice.reducer;
export default customerReducer;
