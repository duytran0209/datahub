import { PayloadAction } from '@reduxjs/toolkit';
import drugHistoryApi from 'api/drugHistoryApi';
import { ListParams, ListResponse, ResponseMessage } from 'models';
import { DrugHistory } from 'models/drugHistory';
import { call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import { drugHistoryActions } from './drugHistorySlice';

function* fetchDrugHistoryList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<DrugHistory> = yield call(drugHistoryApi.getAll, action.payload);
    yield put(drugHistoryActions.fetchDrugHistoryListSuccess(response));
  } catch (error) {
    yield put(drugHistoryActions.fetchDrugHistoryListFailed());
  }
}

export function* drugHistorySaga() {
  yield takeLatest(drugHistoryActions.fetchDrugHistoryList, fetchDrugHistoryList);
}
