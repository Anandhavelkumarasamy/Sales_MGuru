import React, { useState, useEffect } from "react";
import {  useSelector } from "react-redux";

import { Form } from "react-bootstrap";
import { enquirydropdown } from "../../component/axios/Service";


export default function EnquiryDropdown({
  value,
  onChange,
  errorText,
  
}) {
  const objectToken = useSelector((state) => state.authLogin);
  const [requirementsdata,setRequirementsdata]=useState(null);

  const handledropdownrequirements=()=>{
    let formdata=new FormData();
    formdata.append("token",objectToken.token)
    enquirydropdown(formdata).then((response)=>{
  console.log(response,"requirements dropdown");
  setRequirementsdata(response.data.data)
 }).catch((error)=>console.log("requirementsdropdownerror",error))
  }
  useEffect(()=>{
    handledropdownrequirements();
  },[objectToken.token])
  

  return (
    <Form.Group controlId="dealerIdDropdown">
      <Form.Label>Select Enquiry id</Form.Label>
      <Form.Control as="select" value={value} onChange={onChange}>
        <option value="">Select a Enquiry Id</option>
        {requirementsdata?.map((item, index) => (
          <option key={item.enquiryId} value={item.enquiryId}>
            {item.enquiryName}
          </option>
        ))}
      </Form.Control>
      {errorText && <Form.Text className="text-danger">{errorText}</Form.Text>}
    </Form.Group>
  );
}
