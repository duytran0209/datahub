import { PayloadAction } from '@reduxjs/toolkit';
import siteApi from 'api/siteApi';
import { ListParams, ListResponse } from 'models';
import { Site } from 'models/site';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { siteActions } from './siteSlice';

function* fetchSiteList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Site> = yield call(siteApi.getAll, action.payload);
    yield put(siteActions.fetchSiteListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch key populations list', error);
    yield put(siteActions.fetchSiteListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(siteActions.setFilter(action.payload));
}

export function* siteSaga() {
  yield takeLatest(siteActions.fetchSiteList, fetchSiteList);

  yield debounce(500, siteActions.setFilterWithDebounce.type, handleSearchDebounce);
}
