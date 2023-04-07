
export interface PrepPlan {
  customerType: number;
  startDate: Date;
  endDate?: any;
  endReason?: any;
  transferSource?: any;
  note?: any;
}



export interface Prep {
  reExaminationPeriod: number;
  date: Date;
  testResult?: any;
  treatmentStatus?: any;
  prEPGraph: string;
  grantedDrugs: number;
  nextDate: Date;
  outOfMedicineDate: Date;
  isContinuous: boolean;
  maxCountinuousDays: number;
  unit: string;
  prEPPlan: PrepPlan;
  customerId: string;
  type: string[];
  id: string;
  isDeleted: boolean;
  isDisabled: boolean;
  dateCreated: Date;
  dateUpdated: Date;
}


