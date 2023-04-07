export interface Report {
  id: string;
  periodType: number;
  quarter: number;
  reportPeriod: Date;
  provinceCode?: any;
  indicatorCode: number;
  total: number;
  type: string[];
  reportDetails: ReportDetail[];
}

export interface ReportDetail {
  reportPeriod: string;
  site: string;
  ageGroup: string;
  gender: string;
  keyPopulation: string;
  total: number;
  numerator: number;
  denominator: number;
}

export interface ReportCalculateModel {
  year: number;
  period: number;
  quarter?: number;
  month?: number;
  indicatorGroups: number[];
  indicators: number[];
}
