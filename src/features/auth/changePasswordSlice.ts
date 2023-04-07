import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { User, ChangePasswordPayload } from 'models';

export interface ChangePasswordSlice {
  isLoading: Boolean;
  currentUser?: User;
  error?: string;
}

const initialState: ChangePasswordSlice = {
  isLoading: false,
  currentUser: undefined,
  error: undefined,
};

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
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
  },
});

export const changePasswordActions = changePasswordSlice.actions;

export const selectIsLoading = (state: RootState) => state.changePassword.isLoading;

const changePasswordReducer = changePasswordSlice.reducer;
export default changePasswordReducer;
