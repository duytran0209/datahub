const userModule = 'https://auth.quanlyhiv.vn/api';
const dataHubModule = 'https://datahub-api.hcdc.vn/api';

export const apiLinks = {
  drugHistory: {
    get: `${dataHubModule}/DrugUseAndStorages`,
    import: `${dataHubModule}/DrugUseAndStorages/ImportByExcel`,
  },
  auth: {
    login: `${userModule}/Users/Login`,
    changePassword: `${userModule}/Users/ChangePassword`,
    getUserInfo: `${userModule}/Users/GetUserInfo`,
  },
  drug: {
    listDrugs: `${dataHubModule}/Medicine`,
    deleteDrugs: `${dataHubModule}/Medicine/`,
    common: `${dataHubModule}/Medicine/`,
  },
  keyPopulation: {
    common: `${dataHubModule}/KeyPopulations`,
  },
  site: {
    common: `${dataHubModule}/Sites`,
  },
  gender: `${dataHubModule}/Gender`,
  customer: {
    get: `${dataHubModule}/Customers`,
    getById: (id: string) => {
      return `${dataHubModule}/Customers/${id}`;
    },
    getByCode: (id: string) => {
      return `${dataHubModule}/Customers/Code/${id}`;
    },
  },
  testings: {
    get: `${dataHubModule}/Testings`,
    getById: (id: string) => {
      return `${dataHubModule}/Testings/${id}`;
    },
    import: `${dataHubModule}/Testings/ImportByExcel`,
  },
  preps: {
    get: `${dataHubModule}/PrEPs`,
    getById: (id: string) => {
      return `${dataHubModule}/PrEPs/${id}`;
    },
    import: `${dataHubModule}/PrEPs/ImportByExcel`,
  },
  art: {
    get: `${dataHubModule}/ARVs`,
    getById: (id: string) => {
      return `${dataHubModule}/ARVs/${id}`;
    },
    import: `${dataHubModule}/ARVs/ImportByExcel`,
  },
  reports: {
    reports: `${dataHubModule}/Reports`,
    exportReports: `${dataHubModule}/Reports/ExportReports`,
    exportReportDetails: `${dataHubModule}/Reports/ExportReportDetails`,
    exportCustomers: `${dataHubModule}/Reports/ExportCustomers`,
    calculateReport: ``,
  },
  ageGroup: `${dataHubModule}/AgeGroups`,
  districts: `${dataHubModule}/Districts`,
  province: `${dataHubModule}/Provinces`,
};
