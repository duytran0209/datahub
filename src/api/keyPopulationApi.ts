import { ListParams, ListResponse, KeyPopulation } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';

const keyPopulationApi = {
  getAll(params: ListParams): Promise<ListResponse<KeyPopulation>> {
    return axiosClient.get(apiLinks.keyPopulation.common, { params });
  },

  getById(id: string): Promise<KeyPopulation> {
    return axiosClient.get(`${apiLinks.keyPopulation.common}/${id}`);
  },

  add(data: KeyPopulation): Promise<KeyPopulation> {
    return axiosClient.post(apiLinks.keyPopulation.common, data);
  },

  update(data: Partial<KeyPopulation>): Promise<KeyPopulation> {
    const url = `${apiLinks.keyPopulation.common}`;
    return axiosClient.put(url, data);
  },

  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.keyPopulation.common}/${id}`);
  },
};

export default keyPopulationApi;
