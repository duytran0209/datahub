import { Province, ListParams, ListResponse } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';

const provinceApi = {
  getAll(params: ListParams): Promise<ListResponse<Province>> {
    return axiosClient.get(apiLinks.province, { params });
  },

  getById(id: string): Promise<Province> {
    return axiosClient.get(`${apiLinks.province}/${id}`);
  },

  add(data: Province): Promise<Province> {
    return axiosClient.post(apiLinks.province, data);
  },

  update(data: Partial<Province>): Promise<Province> {
    const url = `${apiLinks.province}`;
    return axiosClient.put(url, data);
  },

  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.province}/${id}`);
  },
};

export default provinceApi;
