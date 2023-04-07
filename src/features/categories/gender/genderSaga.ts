import { PayloadAction } from '@reduxjs/toolkit';
import genderApi from 'api/genderApi';
import { ListParams, ListResponse, Gender } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { genderActions } from './genderSlice';

function* fetchGenderList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Gender> = yield call(genderApi.getAll, action.payload);
    yield put(genderActions.fetchGenderListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch key populations list', error);
    yield put(genderActions.fetchGenderListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(genderActions.setFilter(action.payload));
}

export function* genderSaga() {
  yield takeLatest(genderActions.fetchGenderList, fetchGenderList);

  yield debounce(500, genderActions.setFilterWithDebounce.type, handleSearchDebounce);
}
