import React, { useEffect, useState } from 'react';
import { Users } from '../../axios/Service';
import { useSelector } from 'react-redux';
import { selectorProps } from '../../../@types/dashboard';
import { DashboradDataProps } from '../../../@types/dashboardobject';

export default function ListDashboard() {
  const [people, setPeople] = useState<DashboradDataProps[]>([]);
  const datass=useSelector((state:selectorProps)=>state?.authLogin)
  // const[array,setArray]=useState([]);
  const handle=()=>{
  let formdata=new FormData();
  formdata.append('token',datass?.token);
   Users(formdata)
   .then((response)=>{
    console.log("API Response:" , response?.data);
    setPeople(response?.data?.data);
   })
  }



useEffect(()=>{
  if(datass?.token){
    handle();  }
},[datass?.token])
  
  return (
    <div>
    <h1>Welcome</h1>
    <div className="row">
      {people?.map((item, index) => (
        <div className="col-lg-3 col-md-6  g-3" key={index}>
          <div className="card  p-3" style={{backgroundColor: '#002244',color:'white'}}>
        <div>   <strong> <p style={{fontSize:'18px'}}>{item.displayName}</p></strong></div>
            <p style={{fontSize:'14px'}}>{item.type}</p>
            <p style={{fontSize:'14px'}}>{item.leads.displayName} {": "+item.leads.value}</p>
            <p style={{fontSize:'14px'}}>{item.over_due.displayName} {": "+item.over_due.value}</p>
          </div>
        </div>
      ))}
    </div>
    <br />
    <div>
    
   
    </div>
  </div>
  );
}
