import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { User, LoginPayload } from 'models';
import { ChangePasswordPayload } from '../../models/changePassword';

export interface AuthState {
  isLoading: Boolean;
  currentUser?: User;
  error?: string;
}

const initialState: AuthState = {
  isLoading: false,
  currentUser: undefined,
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.isLoading = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoading = true;
      state.currentUser = action.payload;
      state.error = undefined;
    },
    loginFailed(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    changePassword(state, action: PayloadAction<ChangePasswordPayload>) {
      state.isLoading = true;
    },
    changePasswordSuccess(state, action: PayloadAction<User>) {
      state.isLoading = true;
      state.currentUser = action.payload;
      state.error = undefined;
    },
    changePasswordFailed(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getUserInfo(state) {
      state.isLoading = true;
    },
    getUserInfoSuccess(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    getUserInfoFailed(state, action: PayloadAction<any>) {
      state.isLoading = false;
    },
    logout(state) {
      state.isLoading = false;
      state.currentUser = undefined;
    },
  },
});

export const authActions = authSlice.actions;

export const selectIsLoading = (state: RootState) => state.auth.isLoading;

const authReducer = authSlice.reducer;
export default authReducer;
