import { ListParams, ListResponse } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';
import { AgeGroup } from 'models/ageGroup';

const ageGroupApi = {
  getAll(params: ListParams): Promise<ListResponse<AgeGroup>> {
    return axiosClient.get(apiLinks.ageGroup, { params });
  },
  getById(id: string): Promise<AgeGroup> {
    return axiosClient.get(`${apiLinks.ageGroup}/${id}`);
  },
  add(data: AgeGroup): Promise<AgeGroup> {
    return axiosClient.post(apiLinks.ageGroup, data);
  },
  update(data: AgeGroup): Promise<AgeGroup> {
    const url = `${apiLinks.ageGroup}`;
    return axiosClient.put(url, data);
  },
  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.ageGroup}/${id}`);
  },
};

export default ageGroupApi;
