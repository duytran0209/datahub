// export interface AgeGroup {
//   id?: string;
//   name: string;
//   from: number;
//   to: number;
//   order: number;
// }
export interface AgeGroup {
  id?:string;
  name:string;
  order:number;
  lowestAge:number;
  olderAge:number;
}
