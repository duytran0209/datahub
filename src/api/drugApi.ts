import { ListParams, ListResponse, Drug } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';

const drugApi = {
  getAll(params: ListParams): Promise<ListResponse<Drug>> {
    return axiosClient.get(apiLinks.drug.listDrugs, { params });
  },

  getById(id: string): Promise<Drug> {
    const url = `/Medicine/${id}`;
    return axiosClient.get(url);
  },

  add(data: Drug): Promise<Drug> {
    return axiosClient.post(apiLinks.drug.common, data);
  },

  update(data: Partial<Drug>): Promise<Drug> {
    const url = `/Medicine/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.drug.listDrugs}/${id}`);
  },
};

export default drugApi;
