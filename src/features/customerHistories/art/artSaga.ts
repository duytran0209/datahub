import { PayloadAction } from '@reduxjs/toolkit';
import artApi from 'api/artApi';
import { ListParams, ListResponse, ART } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { artActions } from './artSlice';

function* fetchARTList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<ART> = yield call(artApi.getAll, action.payload);
    yield put(artActions.fetchARTListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch ART list', error);
    yield put(artActions.fetchARTListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(artActions.setFilter(action.payload));
}

export function* artSaga() {
  yield takeLatest(artActions.fetchARTList, fetchARTList);

  yield debounce(500, artActions.setFilterWithDebounce.type, handleSearchDebounce);
}
