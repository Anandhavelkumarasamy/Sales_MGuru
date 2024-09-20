import { paginationProps } from "./admin";

export type LeadItems={
    leadId:number;
    leadName:string;
    mobile:string;
    address:string;
    isActive:number;
}
export interface leaduserlistprops extends paginationProps{
    items:LeadItems[];
}
export interface RecordType {
    leadId: number;
    leadName: string;
    isActive: number;
  }
