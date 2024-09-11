// src/Components/UserFilter.js

import React from 'react';
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import TextInputBox from '../userManagementModals/TextInputBox';

const LeadFilter = ({ handleleadsuserList}) => {
  
  const { values, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues: {
        leadName: "",
      email: "",
      mobile: "",
    },
    onSubmit: (values) => {
      handleleadsuserList(1, 5, values);
      console.log(values,"leadvalues")
    },
  });

  const handlereset = () => {
    const emptyValues = {
        leadName: "",
      email: "",
      mobile: "",
    };
    handleleadsuserList(1,5,emptyValues);
    resetForm();
  
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <TextInputBox
            title={"leadName"}
            value={values.leadName}
            onchange={handleChange("leadName")}
            placeholder="Enter leadName"
            onBlurs={handleBlur}
          />
        </Col>
        <Col>
          <TextInputBox
            title={"Mobile Number"}
            value={values.mobile}
            onchange={handleChange("mobile")}
            placeholder="Enter Mobile Number"
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

      <Button variant="primary" onClick={handleSubmit} className="float-end mt-2 ">
        Search
      </Button>
      <Button variant="primary" onClick={handlereset} className="float-end me-3 mt-2">
        Reset
      </Button>
    </form>
  );
};

export default LeadFilter;
