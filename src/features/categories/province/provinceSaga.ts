import { PayloadAction } from '@reduxjs/toolkit';
import provinceApi from 'api/provinceApi';
import { ListParams, ListResponse, Province } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { provinceActions } from './provinceSlice';

function* fetchProvinceList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Province> = yield call(provinceApi.getAll, action.payload);
    console.log(response);
    yield put(provinceActions.fetchProvinceListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch province list', error);
    yield put(provinceActions.fetchProvinceListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(provinceActions.setFilter(action.payload));
}

export default function* provinceSaga() {
  yield takeLatest(provinceActions.fetchProvinceList, fetchProvinceList);

  yield debounce(500, provinceActions.setFilterWithDebounce.type, handleSearchDebounce);
}
