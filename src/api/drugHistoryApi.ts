import { DrugHistory, ListParams, ListResponse, ResponseMessage }
  from 'models';

import { apiLinks } from 'utils';
import axiosClient from './axiosClient';

const drugHistoryApi = {
  getAll(params: ListParams): Promise<ListResponse<DrugHistory>> {
    return axiosClient.get(apiLinks.drugHistory.get, { params });
  },

  importFile(file: File): Promise<ResponseMessage<any>> {
    const data = new FormData();
    data.append('file', file);
    return axiosClient.post(apiLinks.drugHistory.import, data);
  },

  getById(id: string): Promise<ResponseMessage<DrugHistory>> {
    return axiosClient.get(`${apiLinks.drugHistory.get}/${id}`);
  },

  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.drugHistory.get}/${id}`);
  },
};

export default drugHistoryApi;
