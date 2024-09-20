import { userlistprops } from "./admin";

interface logindataprops {
  username: string;
  password: string;
  device_type: string;
  authcode: string;
}
interface LoginResponse {
  token: string;
}

interface adduserprops {
  token: string;
  name: string;
  userName: string;
  phoneNumber: string;
}

interface adduserresponse {
  status: number;
  msg?: string;
}

export type userpropsdata = {
  displayName: string;
  key: string;
  colorCode: string;
  value: number;
  type: number;
  leads: userpropsdataleads;
  over_due: userpropsdataleads;
};
export type userpropsdataleads = {
  displayName: string;
  value: number;
};

export interface UserItem {
  userId: number;
  userName: string;
  name: string;
  landline_number: string | null;
  phoneNumber: string;
  whatsapp_no: string | null;
  email: string | null;
  userStatus: number;
  userType: number;
  userTypeName: string;
  dealer_id: number | null;
  dealerName: string | null;
  location: string | null;
}

export interface UserData {
  page: number;
  size: number;
  total_page: number;
  total_count: number;
  items: UserItem[];
}

//interface Userprops {
//   status: number;
//   msg?: string;
//   data: userpropsdata[];
// }

// interface Token {
//   token: string;
// }

// interface UserId {
//   id: string;
// }

// interface LeadFilterData {
//   leadName: string;
//   state: string;
//   mobile: string;
// }

// interface PageData {
//   page: number;
//   size: number;
// }
