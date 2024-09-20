import { paginationProps } from "./admin";

export type EmployeeItems={
    userId: number;
    userName: string;
    phoneNumber: string;
    userTypeName: string;
    email: string;
}
export interface  employeeuserlistprops extends paginationProps{
    items: EmployeeItems[];
  }

export type showmodalprops={
    isShow: boolean,
    data: EmployeeItems | null,
}