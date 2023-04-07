import { ListParams, ListResponse, Customer } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';

const customerApi = {
  getAll(params: ListParams): Promise<ListResponse<Customer>> {
    return axiosClient.get(apiLinks.customer.get, { params });
  },
  getById(id: string): Promise<Customer> {
    const url = `${apiLinks.customer.getById(id)}`;
    return axiosClient.get(url);
  },
  getByCode(code: string): Promise<Customer> {
    const url = `${apiLinks.customer.getByCode(code)}`;
    return axiosClient.get(url);
  },
};

export default customerApi;
