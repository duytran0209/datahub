import { ListParams, ListResponse, ResponseMessage, Testing } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';

const testingApi = {
  getAll(params: ListParams): Promise<ListResponse<Testing>> {
    return axiosClient.get(apiLinks.testings.get, { params });
  },
  getById(id: string): Promise<Testing> {
    const url = `${apiLinks.testings.getById(id)}`;
    return axiosClient.get(url);
  },
  importFile(file: File): Promise<ResponseMessage<any>> {
    const data = new FormData();
    data.append('file', file);
    return axiosClient.post(apiLinks.testings.import, data);
  },
};

export default testingApi;
