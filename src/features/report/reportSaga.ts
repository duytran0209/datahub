import { PayloadAction } from '@reduxjs/toolkit';
import reportApi from 'api/reportApi';
import { ListParams, ListResponse, Report, ResponseMessage } from 'models';
import { call, debounce, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { reportActions } from './reportSlice';

function* fetchReportList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Report> = yield call(reportApi.getAll, action.payload);
    yield put(reportActions.fetchReportListSuccess(response));
  } catch (error) {
    yield put(reportActions.fetchReportListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(reportActions.setFilter(action.payload));
}

function* fetchReport(action: PayloadAction<string>) {
  try {
    const response: ResponseMessage<Report> = yield call(reportApi.getById, action.payload);
    yield put(reportActions.fetchReportSuccess(response.data));
  } catch (error) {
    yield put(reportActions.fetchReportFail(error));
  }
}

export function* reportSaga() {
  yield takeLatest(reportActions.fetchReportList, fetchReportList);
  yield takeEvery(reportActions.fetchReport, fetchReport);

  yield debounce(500, reportActions.setFilterWithDebounce.type, handleSearchDebounce);
}
