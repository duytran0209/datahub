import { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from 'api';
import { push } from 'connected-react-router';
import { t } from 'i18next';
import { LoginPayload, ResponseMessage } from 'models';
import { User, UserInfo } from 'models/user';
import { call, fork, put, take, takeLatest, takeLeading } from 'redux-saga/effects';
import { authActions } from './authSlice';
import { ChangePasswordPayload } from '../../models/changePassword';

function* handleLogin(payload: LoginPayload) {
  try {
    const rs: User = yield call(authApi.login, payload);
    if (payload.rememberMe) {
      yield localStorage.setItem('access_token', rs.access_token);
    } else {
      yield sessionStorage.setItem('access_token', rs.access_token);
    }
    yield put(authActions.loginSuccess(rs));
    yield put(push('/'));
  } catch (error: any) {
    yield put(authActions.logout());
    yield put(authActions.loginFailed(t(error?.response?.data) || error.message));
  }
}

function* handleLogout() {
  localStorage.removeItem('access_token');
  sessionStorage.removeItem('access_token');
  // redirect to login page
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn =
      Boolean(localStorage.getItem('access_token')) ||
      Boolean(sessionStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

function* handleGetUserInfo() {
  try {
    const rs: ResponseMessage<UserInfo> = yield call(authApi.getUserInfo);
    yield put(authActions.getUserInfoSuccess(rs.data.userInfo));
  } catch (error) {}
}

function* handleChangePassword(action: PayloadAction<ChangePasswordPayload>) {
  try {
    const rs: User = yield call(authApi.changePassword, action.payload);
    yield put(authActions.changePasswordSuccess(rs));
  } catch (error) {
    yield put(authActions.changePasswordFailed('Error'));
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
  yield takeLatest(authActions.getUserInfo, handleGetUserInfo);
  yield takeLeading(authActions.changePassword.type, handleChangePassword);
}
