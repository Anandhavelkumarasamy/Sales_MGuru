import { paginationProps } from "./admin";

export interface enquirylistprops extends paginationProps {
  items: Enquiry[];
}
export type Enquriy = {
  customerCategoryId: string;
  enquireTypeName: string;
};
