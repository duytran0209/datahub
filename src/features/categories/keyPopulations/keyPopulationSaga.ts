import { PayloadAction } from '@reduxjs/toolkit';
import keyPopulationApi from 'api/keyPopulationApi';
import { ListParams, ListResponse, KeyPopulation } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { keyPopulationActions } from './keyPopulationSlice';

function* fetchKeyPopulationList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<KeyPopulation> = yield call(
      keyPopulationApi.getAll,
      action.payload
    );
    yield put(keyPopulationActions.fetchKeyPopulationListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch key populations list', error);
    yield put(keyPopulationActions.fetchKeyPopulationListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(keyPopulationActions.setFilter(action.payload));
}

export function* keyPopulationSaga() {
  yield takeLatest(keyPopulationActions.fetchKeyPopulationList, fetchKeyPopulationList);

  yield debounce(500, keyPopulationActions.setFilterWithDebounce.type, handleSearchDebounce);
}
