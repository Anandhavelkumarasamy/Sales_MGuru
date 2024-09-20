import { paginationProps } from "./admin";

export interface masterlistprops extends paginationProps {
  items: requirementitem[];
}
export type requirementitem = {
  customerCategoryId: string;
  RequirementsName: string;
};
