import { Districts, ListParams, ListResponse } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';

const districtsApi = {
  getAll(params: ListParams): Promise<ListResponse<Districts>> {
    return axiosClient.get(apiLinks.districts, { params });
  },

  getById(id: string): Promise<Districts> {
    return axiosClient.get(`${apiLinks.districts}/${id}`);
  },

  add(data: Districts): Promise<Districts> {
    return axiosClient.post(apiLinks.districts, data);
  },

  update(data: Partial<Districts>): Promise<Districts> {
    const url = `${apiLinks.districts}`;
    return axiosClient.put(url, data);
  },

  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.districts}/${id}`);
  },
};

export default districtsApi;
