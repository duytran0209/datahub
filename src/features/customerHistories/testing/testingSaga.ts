import { PayloadAction } from '@reduxjs/toolkit';
import testingApi from 'api/testingApi';
import { ListParams, ListResponse, Testing } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { testingActions } from './testingSlice';

function* fetchTestingList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Testing> = yield call(testingApi.getAll, action.payload);
    yield put(testingActions.fetchTestingListSuccess(response));
  } catch (error) {
    yield put(testingActions.fetchTestingListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(testingActions.setFilter(action.payload));
}

export function* testingSaga() {
  yield takeLatest(testingActions.fetchTestingList, fetchTestingList);

  yield debounce(500, testingActions.setFilterWithDebounce.type, handleSearchDebounce);
}
