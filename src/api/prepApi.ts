import { ListParams, ListResponse, Prep, ResponseMessage } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';

const prepApi = {
  getAll(params: ListParams): Promise<ListResponse<Prep>> {
    return axiosClient.get(apiLinks.preps.get, { params });
  },
  getById(id: string): Promise<Prep> {
    const url = `${apiLinks.preps.getById(id)}`;
    return axiosClient.get(url);
  },
  importFile(file: File): Promise<ResponseMessage<any>> {
    const data = new FormData();
    data.append('file', file);
    return axiosClient.post(apiLinks.preps.import, data);
  },
};

export default prepApi;
