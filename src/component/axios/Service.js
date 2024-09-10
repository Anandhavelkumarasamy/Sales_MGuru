
import instance from "./Axios";

export const signin=(login)=>{
    return instance.post("/login",login)
}
export const Users=(token)=>{
    return instance.post("/dashboard/all_data_count",token);
}
export const admindetails=(tokenid)=>{
    return instance.post("/user/list_users",tokenid);
}
export const adduser=(value)=>{
    return instance.post("/user/create_user",value)
}
export const deleteuser=(id)=>{
    return instance.post("/user/delete_user",id)
}
export const viewuser=(values)=>{
    return instance.post("/user/view_user",values)
}
export const updateuser=(id)=>{
    return instance.post('/user/update_user',id);
}

export const listuser=(page,size,data)=>{
    return instance.post(`user/list_users?page=${page}&size=${size}`,data);
}
// export const countrydropdown=(id)=>{
//     return instance.post('/dropdown/dropdown_country',id);
// }
export const dealeriddropdown=(id)=>{
    return instance.post('/dropdown/employeeDropDown',id)
}


export const forgotpassword=(email)=>{
    return instance.post('/forgotPassword',email);
}
export const verifyotp=(data)=>{
    return instance.post('/verify_otp',data);
}
export const changepassword=(data)=>{
    return instance.post('/reset_password',data);
}
export const leadlistuser=(page,size,data)=>{
    return instance.post(`/lead/list_lead?page=${page}&size=${size}`,data)
}
export const addleaduser=(data)=>{
    return instance.post('/lead/create_lead',data)
}
export const updateleaduser=(data)=>{
    return instance.post('/lead/lead_update',data)
}

export const deleteleaduser=(data)=>{
    return instance.post('/lead/delete_lead',data)
}
export const viewleaduser=(data)=>{
    return instance.post('/lead/view_lead',data);
}
export const requirementsdropdown=(token)=>{
    return instance.post('/dropdown/dropdownRequirements',token);
}
export const customerrequirementsdropdown=(token)=>{
    return instance.post('/dropdown/dropdownCustomerCategory',token);
}
export const enquirydropdown=(token)=>{
    return instance.post('/dropdown/dropdownEnquiry',token)
}

export const isactive=(data)=>{
    return instance.post('/lead/hot_lead',data);
}
export const leaddropdown=(token)=>{
    return instance.post('/dropdown/dropdownLead',token)
}
export const changeleadstatus=(data)=>{
    return instance.post('/lead/changeLeadStatus',data);
}