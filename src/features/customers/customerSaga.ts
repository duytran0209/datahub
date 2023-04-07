import { PayloadAction } from '@reduxjs/toolkit';
import customerApi from 'api/customerApi';
import { ListParams, ListResponse, Customer } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { customerActions } from './customerSlice';

function* fetchCustomerList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Customer> = yield call(customerApi.getAll, action.payload);
    yield put(customerActions.fetchCustomerListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch customer list', error);
    yield put(customerActions.fetchCustomerListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(customerActions.setFilter(action.payload));
}

export function* customerSaga() {
  yield takeLatest(customerActions.fetchCustomerList, fetchCustomerList);

  yield debounce(500, customerActions.setFilterWithDebounce.type, handleSearchDebounce);
}
