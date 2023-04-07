export interface Site {
  id?: string;
  provinceID: string;
  districtID: string;
  name: string;
  siteCode: string;
  order: number;
  dateCreated:Date;
}

export interface SiteRequest {
  searchValue: string;
  pageIndex: number;
  pageSize: number;
}

export interface OptionsDSProvince{
  id?: string;
  code: string;
  slug: string;
  type: string;
  name: string;
  standardName: string;
  nameWithType:string;
}