import { ListParams, ListResponse, ART, ResponseMessage } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';

const artApi = {
  getAll(params: ListParams): Promise<ListResponse<ART>> {
    return axiosClient.get(apiLinks.art.get, { params });
  },
  getById(id: string): Promise<ART> {
    const url = `${apiLinks.art.getById(id)}`;
    return axiosClient.get(url);
  },
  importFile(file: File): Promise<ResponseMessage<any>> {
    const data = new FormData();
    data.append('file', file);
    return axiosClient.post(apiLinks.art.import, data);
  },
};

export default artApi;
