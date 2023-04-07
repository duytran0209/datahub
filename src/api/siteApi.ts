import { ListParams, ListResponse, Site } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';

const siteApi = {
  getAll(params: ListParams): Promise<ListResponse<Site>> {
    return axiosClient.get(apiLinks.site.common, { params });
  },

  getById(id: string): Promise<Site> {
    return axiosClient.get(`${apiLinks.site.common}/${id}`);
  },

  add(data: Site): Promise<Site> {
    return axiosClient.post(apiLinks.site.common, data);
  },

  update(data: Partial<Site>): Promise<Site> {
    const url = `${apiLinks.site.common}`;
    return axiosClient.put(url, data);
  },

  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.site.common}/${id}`);
  },
};

export default siteApi;
