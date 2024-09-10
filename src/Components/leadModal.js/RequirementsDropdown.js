import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form } from "react-bootstrap";
import { requirementsdropdown } from "../../component/axios/Service";


export default function RequirementsDropdown({
  value, onChange, errorText}) {
  const objectToken = useSelector((state) => state.authLogin);
  const [requirementsdata,setRequirementsdata]=useState(null);

  const handledropdownrequirements=()=>{
    let formdata=new FormData();
    formdata.append("token",objectToken.token)
    requirementsdropdown(formdata).then((response)=>{
  console.log(response,"requirements dropdown");
  setRequirementsdata(response.data.data)
 }).catch((error)=>console.log("requirementsdropdownerror",error))
  }
  useEffect(()=>{
    handledropdownrequirements();
  },[objectToken.token])
  

  return (
    <Form.Group controlId="dealerIdDropdown">
      <Form.Label>Select Requirement ID</Form.Label>
      <Form.Control as="select" value={value} onChange={onChange}>
        <option value="">Select a Requirement ID</option>
        {requirementsdata?.map((item, index) => (
          <option key={item.RequirementsId} value={item.RequirementsId}>
            {item.RequirementsName}
          </option>
        ))}
      </Form.Control>
      {errorText && <Form.Text className="text-danger">{errorText}</Form.Text>}
    </Form.Group>
  );
}
