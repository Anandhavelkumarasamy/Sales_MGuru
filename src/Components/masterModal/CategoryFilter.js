import React, { useState } from "react";
import TextInputBox from "../userManagementModals/TextInputBox";
import { Button, Row, Col } from "react-bootstrap";

export default function CategoryFilter({ handleGetMasterCategoryList }) {
  const [name, setName] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
    if (e.target.value.trim()) {
      setErrorText("");
    }
  };
  const handleSubmit = () => {
    if (!name.trim()) {
      setErrorText("Name is  Required");
      return;
    }
    handleGetMasterCategoryList(1,5,name);
  };
  const handleReset = () => {
    handleGetMasterCategoryList();
  };

  return (
    <div  >
      <Row className="justify-content-end" >
      
        <Col lg={4}>
          <TextInputBox 
            title="Name"
            value={name}
            onchange={handleChange}
            placeholder="Enter Name"
            errorText={errorText}
          />
        </Col>
        <Col lg={2} className="align-content-end">
          <Button onClick={handleSubmit}>
            Submit
          </Button>
          <Button className=" float-end " onClick={handleReset}>
            Reset
          </Button>
        </Col>
      </Row>
    </div>
  );
}
