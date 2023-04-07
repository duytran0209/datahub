export interface History {
  customerId: string;
  type: string;
  id: string;
  isDeleted: boolean;
  dateCreated: Date;
}

export interface Customer {
  name?: string;
  yoB: number;
  doB?: any;
  gender: number;
  phone?: any;
  cmnd: string;
  prEPCode: string;
  cardCode?: any;
  keyPopulationId: string;
  histories: History[];
  id: string;
  isDeleted: boolean;
  dateCreated: Date;
}
