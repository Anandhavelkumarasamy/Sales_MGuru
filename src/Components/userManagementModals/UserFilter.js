// src/Components/UserFilter.js

import React from 'react';
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import TextInputBox from './TextInputBox';

const UserFilter = ({ handleGetListUseres}) => {
  
  const { values, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
    },
    onSubmit: (values) => {
      handleGetListUseres(1, 5, values);
    },
  });

  const handlereset = () => {
    const emptyValues = {
      userName: "",
      email: "",
      phoneNumber: "",
    };
    handleGetListUseres(1, 5, emptyValues);
    resetForm();
    // resetFormHandler(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <TextInputBox
            title={"User Name"}
            value={values.userName}
            onchange={handleChange("userName")}
            placeholder="Enter username"
            onBlurs={handleBlur}
          />
        </Col>
        <Col>
          <TextInputBox
            title={"Phone Number"}
            value={values.phoneNumber}
            onchange={handleChange("phoneNumber")}
            placeholder="Enter phone Number"
          />
        </Col>
        <Col>
          <TextInputBox
            title={"Email"}
            value={values.email}
            onchange={handleChange("email")}
            placeholder="Enter email"
          />
        </Col>
      </Row>

      <Button style={{background:'#002244'}} onClick={handleSubmit} className="float-end mt-2 ">
        Search
      </Button>
      <Button style={{background:'#002244'}} onClick={handlereset} className="float-end me-3 mt-2 mb-3">
        Reset
        
      </Button>
      
    </form>
    
  );
};

export default UserFilter;
