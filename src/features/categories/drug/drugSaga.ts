import { PayloadAction } from '@reduxjs/toolkit';
import drugApi from 'api/drugApi';
import { ListParams, ListResponse, Drug } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { drugActions } from './drugSlice';

function* fetchDrugList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Drug> = yield call(drugApi.getAll, action.payload);
    yield put(drugActions.fetchDrugListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch drug list', error);
    yield put(drugActions.fetchDrugListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(drugActions.setFilter(action.payload));
}

export function* drugSaga() {
  yield takeLatest(drugActions.fetchDrugList, fetchDrugList);

  yield debounce(500, drugActions.setFilterWithDebounce.type, handleSearchDebounce);
}
