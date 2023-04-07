import { LoginPayload } from 'models';
import { User } from 'models/user';
import { apiLinks } from 'utils';
import axiosClient from './axiosClient';
import { ChangePasswordPayload } from '../models/changePassword';

export const authApi = {
  login(payload: LoginPayload): Promise<User> {
    return axiosClient.post(apiLinks.auth.login, payload);
  },
  getUserInfo(): Promise<User> {
    return axiosClient.get(apiLinks.auth.getUserInfo);
  },
  changePassword(payload: ChangePasswordPayload): Promise<any> {
    return axiosClient.put(apiLinks.auth.changePassword, payload);
  },
};
