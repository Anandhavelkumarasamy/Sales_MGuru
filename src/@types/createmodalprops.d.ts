export type createmodalprops = {
  show: boolean;
  handleClose: () => void;
  handleGetListUseres: (
    page: number,
    size: number,
    data?: { userName?: string; email?: string; phoneNumber?: string }
  ) => void;
  usertype: string;
  editData: ediDataProps | null;
};
export type handleadduserprops = {
  name: string;
  userName: string;
  phoneNumber: string;
  userType: string;
  email?: string;
  landline_number?: string;
  state?: string;
  city?: string;
  country?: string;
  password?: string;
  pincode?: string;
  dealer_id?: string;
};
export type FilterValuesProps = {
  userName: string;
  email: string;
  phoneNumber: string;
};
export type UserFilterProps = {
  handleGetListUseres: (
    page: number,
    size: number,
    data?: { userName?: string; email?: string; phoneNumber?: string }
  ) => void;
};
export type ediDataProps = {
  userId: string;
  name?: string;
  userName?: string;
  email?: string;
  landline_number?: string;
  phoneNumber?: string;
  dealer_id?: string;
};
