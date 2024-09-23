// src/Components/UserFilter.js

import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import TextInputBox from "./TextInputBox";
import { UserFilterProps } from "../../@types/createmodalprops";
import classes from "./Crud.module.css";

const UserFilter = ({ handleGetListUseres }: UserFilterProps) => {
  const { values, handleChange, handleBlur, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        userName: "",
        email: "",
        phoneNumber: "",
      },
      onSubmit: (values) => {
        handleGetListUseres(1, 5, values);
        console.log(values, "filtervalues");
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col lg={4} md={6} sm={12}>
          <TextInputBox
            title={"User Name"}
            value={values.userName}
            onchange={handleChange("userName")}
            placeholder="Enter username"
            onBlurs={handleBlur}
          />
        </Col>
        <Col lg={4} md={6} sm={12}>
          <TextInputBox
            title={"Phone Number"}
            value={values.phoneNumber}
            onchange={handleChange("phoneNumber")}
            placeholder="Enter phone Number"
          />
        </Col>
        <Col lg={4} md={6} sm={12}>
          <TextInputBox
            title={"Email"}
            value={values.email}
            onchange={handleChange("email")}
            placeholder="Enter email"
          />
        </Col>
      </Row>

      <Button
        onClick={() => {
          handleSubmit();
        }}
        className={`float-end mt-2 ${classes.buttonbackground}`}
      >
        Search
      </Button>
      <Button
        onClick={() => handlereset()}
        className={`float-end me-3 mt-2 mb-2 ${classes.buttonbackground}`}
      >
        Reset
      </Button>
    </form>
  );
};

export default UserFilter;
