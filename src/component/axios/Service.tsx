import { adduserresponse } from "../../@types/api";

import instance from "./Axios";
import { AxiosResponse } from "axios";

export const signin = (login: FormData) => {
  return instance.post("/login", login);
};
export const Users = (token: FormData) => {
  return instance.post("/dashboard/all_data_count", token);
};
export const admindetails = (tokenid: string) => {
  return instance.post("/user/list_users", tokenid);
};
export const adduser = (value: FormData) => {
  return instance.post("/user/create_user", value);
};
export const deleteuser = (id: FormData) => {
  return instance.post("/user/delete_user", id);
};
// export const viewuser = (values) => {
//   return instance.post("/user/view_user", values);
// };
export const updateuser = (value: FormData) => {
  return instance.post("/user/update_user", value);
};

export const listuser = (page: number, size: number, data: FormData) => {
  return instance.post(`user/list_users?page=${page}&size=${size}`, data);
};

// export const dealeriddropdown = (id) => {
//   return instance.post("/dropdown/employeeDropDown", id);
// };

export const forgotpassword = (email: FormData) => {
  return instance.post("/forgotPassword", email);
};
export const verifyotp = (data: FormData) => {
  return instance.post("/verify_otp", data);
};
export const resendotp = (resetkey: FormData) => {
  return instance.post("/resend_otp", resetkey);
};
export const changepassword = (data: FormData) => {
  return instance.post("/reset_password", data);
};
export const leadlistuser = (page: number, size: number, data: FormData) => {
  return instance.post(`/lead/list_lead?page=${page}&size=${size}`, data);
};
export const addleaduser = (data: FormData) => {
  return instance.post("/lead/create_lead", data);
};
export const updateleaduser = (data: FormData) => {
  return instance.post("/lead/lead_update", data);
};

export const deleteleaduser = (data: FormData) => {
  return instance.post("/lead/delete_lead", data);
};
// export const viewleaduser = (data) => {
//   return instance.post("/lead/view_lead", data);
// };
export const requirementsdropdown = (token: FormData) => {
  return instance.post("/dropdown/dropdownRequirements", token);
};
export const customerrequirementsdropdown = (token: FormData) => {
  return instance.post("/dropdown/dropdownCustomerCategory", token);
};
export const enquirydropdown = (token: FormData) => {
  return instance.post("/dropdown/dropdownEnquiry", token);
};

export const isactive = (data: FormData) => {
  return instance.post("/lead/hot_lead", data);
};
export const leaddropdown = (token: FormData) => {
  return instance.post("/dropdown/dropdownLead", token);
};
export const changeleadstatus = (data: FormData) => {
  return instance.post("/lead/changeLeadStatus", data);
};
export const employdropdown = (token: FormData) => {
  return instance.post("/dropdown/employeeDropDown", token);
};
export const dealerdropdown = (token: FormData) => {
  return instance.post("/dropdown/userDropdown", token);
};
export const leadressign = (data: FormData) => {
  return instance.post("/lead/lead_reassign", data);
};
export const competitordropdown = (token: FormData) => {
  return instance.post("/dropdown/dropdownCompetitor", token);
};
//  master
export const categorylist = (page: number, size: number, token: FormData) => {
  return instance.post(
    `/masters/list_category?page=${page}&size=${size}`,
    token
  );
};
export const addmasteruser = (value: string, data: FormData) => {
  return instance.post(`/masters/create_${value}`, data);
};
export const updatemasteruser = (value: string, data: FormData) => {
  return instance.post(`/masters/update_${value}`, data);
};
export const deletemasteruser = (value: string, data: FormData) => {
  return instance.post(`/masters/delete_${value}`, data);
};
export const enquirylist = (page: number, size: number, value: FormData) => {
  return instance.post(
    `/masters/list_enquiry_type?page=${page}&size=${size}`,
    value
  );
};
export const requirementslist = (
  page: number,
  size: number,
  value: FormData
) => {
  return instance.post(
    `masters/list_requirements?page=${page}&size=${size}`,
    value
  );
};

export const dealerwisereport = (
  page: number,
  size: number,
  value: FormData
) => {
  return instance.post(
    `/dashboard/dealer_wise_report?page=${page}&size=${size}`,
    value
  );
};
