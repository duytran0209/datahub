import { PayloadAction } from '@reduxjs/toolkit';
import prepApi from 'api/prepApi';
import { ListParams, ListResponse, Prep } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { prepActions } from './prepSlice';

function* fetchPrepList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Prep> = yield call(prepApi.getAll, action.payload);
    yield put(prepActions.fetchPrepListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch prep list', error);
    yield put(prepActions.fetchPrepListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(prepActions.setFilter(action.payload));
}

export function* prepSaga() {
  yield takeLatest(prepActions.fetchPrepList, fetchPrepList);

  yield debounce(500, prepActions.setFilterWithDebounce.type, handleSearchDebounce);
}
