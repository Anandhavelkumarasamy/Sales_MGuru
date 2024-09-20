import { paginationProps } from "./admin";

export interface categorylistprops extends paginationProps {
  items: CategoryItem[];
}
export interface CategoryItem {
  customerCategoryId: number;
  customerCategoryName: string;
}
