import React, { useState, useEffect } from "react";
import { employdropdown } from "../../component/axios/Service";
import { Form } from "react-bootstrap";
import { useToken } from "../../utility/hooks";
import { useSelector } from "react-redux";

export default function AssignedEmployeedropdown({ value, onChange, errorText }) {
  const token = useToken();
  const selector=useSelector((state)=>state.authLogin.assignedselecteddealerid);
  console.log(selector,"selectedidddddd")
  const [employeedata, setemployeedata] = useState([]);
  const [selectedemployeeid, setselectedemployeeid] = useState(''); 

  useEffect(() => {
    handleemployeestatus();
  }, [token]);

  const handleemployeestatus = () => {
    if (token) {
      let formdata = new FormData();
      formdata.append('token', token);
      employdropdown(formdata)
        .then((response) => {
          setemployeedata(response.data.data);
          console.log(response.data.data, 'employeedropdown');
        })
        .catch((error) => {
          console.log(error, "employdropdownerror");
        });
    }
  };

  const handleChange = (e) => {
    const selectedId = e.target.value;
    setselectedemployeeid(selectedId);
    onChange(selectedId);
  };

  return (
    <>
      <Form.Group controlId="employeeiddropdown">
        <Form.Label>Select Employee</Form.Label>
        <Form.Control 
          as="select" 
          value={selectedemployeeid} 
          onChange={handleChange}
        >
          <option value="">Select an employee</option>
          {selector ? employeedata?.map((item) => (
            <option key={item.userId} value={item.userId}>
              {item.userName.split('(')[0]}
            </option>
          )): ""}
        </Form.Control>
      </Form.Group>
      {errorText && <div className="error-text">{errorText}</div>}
    </>
  );
}
