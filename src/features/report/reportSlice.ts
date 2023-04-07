import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, Report } from 'models';

export interface ReportState {
  loading: boolean;
  list: Report[];
  filter: ListParams;
  pageCount: number;
  totalRow: number;
  selectedReport?: Report;
}

const initialState: ReportState = {
  loading: false,
  list: [],
  filter: {
    pageIndex: 0,
    pageSize: 10,
    searchName: '',
  },
  pageCount: 0,
  totalRow: 0,
  selectedReport: undefined,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    fetchReportList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchReportListSuccess(state, action: PayloadAction<ListResponse<Report>>) {
      state.list = action.payload.data;
      state.totalRow = action.payload.totalRow;
      state.pageCount = action.payload.pageCount;
      state.loading = false;
    },
    fetchReportListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
    fetchReport(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchReportSuccess(state, action: PayloadAction<Report>) {
      state.loading = false;
      state.selectedReport = action.payload;
    },
    fetchReportFail(state, action: PayloadAction<any>) {
      state.loading = false;
    },
  },
});

// Actions
export const reportActions = reportSlice.actions;

// Selectors
export const selectReportList = (state: RootState) => state.report.list;
export const selectReportLoading = (state: RootState) => state.report.loading;
export const selectReportFilter = (state: RootState) => state.report.filter;
export const selectReportTotalRow = (state: RootState) => state.report.totalRow;
export const selectReportPageCount = (state: RootState) => state.report.pageCount;

// Reducer
const reportReducer = reportSlice.reducer;
export default reportReducer;
