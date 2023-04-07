import { ListParams, ListResponse, Report, Testing } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';

const reportApi = {
  getAll(params: ListParams): Promise<ListResponse<Report>> {
    return axiosClient.get(apiLinks.reports.reports, { params });
  },
  getById(id: string): Promise<Report> {
    const url = `${apiLinks.reports.reports}/${id}`;
    return axiosClient.get(url);
  },
  importByExcel(params: any): Promise<Report> {
    const url = `${apiLinks.reports.reports}`;
    return axiosClient.post(url, params);
  },
  calculateReport(params: any): Promise<any> {
    const url = `${apiLinks.reports.calculateReport}`;
    return axiosClient.get(url, { params });
  },
};

export default reportApi;
