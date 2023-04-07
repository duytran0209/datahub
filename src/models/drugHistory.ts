export interface DrugHistory {
  id?: string;
  reportingPeriod: number;
  siteName: string;
  from: Date;
  to: Date;
  year: number;
  quarter: number;
  month: number;
  dateCreated: Date;
  dateUpdated: Date;
  details: DrugHistoryDetail[];
}

export interface DrugHistoryDetail {
  drugName: string;
  details: DrugSource[];
}

export interface DrugSource {
  source: string;
  packing: number;
  unitName: string;
  lotNumber: string;
  expirationDate: string;
  group: string;
  beginningInventory: number;
  import: number;
  otherImport: number;
  exportToClient: number;
  exportToOther: number;
  damageAndLoss: number;
  endingInventory: number;
}
