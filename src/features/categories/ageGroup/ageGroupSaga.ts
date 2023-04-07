import { PayloadAction } from '@reduxjs/toolkit';
import ageGroupApi from 'api/ageGroupApi';
import { ListParams, ListResponse } from 'models';
import { AgeGroup } from 'models/ageGroup';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ageGroupActions } from './ageGroupSlice';

function* fetchAgeGroupList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<AgeGroup> = yield call(ageGroupApi.getAll, action.payload);
    console.log(response);
    yield put(ageGroupActions.fetchAgeGroupListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch key populations list', error);
    yield put(ageGroupActions.fetchAgeGroupListFailed());
  }
}


export function* ageGroupSaga() {
  yield takeLatest(ageGroupActions.fetchAgeGroupList, fetchAgeGroupList);
}
