export type User = {
  userId: number;
  userName: string;
  phoneNumber: string;
  userTypeName: string;
  email: string;
};

export interface userlistprops extends paginationProps {
  items: User[];
}

interface paginationProps {
  page: number;
  total_count: number;
}
