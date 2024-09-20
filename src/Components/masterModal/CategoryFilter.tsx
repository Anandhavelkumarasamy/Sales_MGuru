import React, { useState } from "react";
import TextInputBox from "../userManagementModals/TextInputBox";
import { Button, Row, Col } from "react-bootstrap";
interface CategoryFilterProps {
  handleGetMasterCategoryList: (
    page: number,
    size?: number,
    name?: string
  ) => void;
}
export default function CategoryFilter({
  handleGetMasterCategoryList,
}: CategoryFilterProps) {
  const [name, setName] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");

  const handleChange = (e: any) => {
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
    handleGetMasterCategoryList(1, 5, name);
  };
  const handleReset = () => {
    handleGetMasterCategoryList(1, 10, "");
  };

  return (
    <div>
      <Row className="justify-content-end">
        <Col lg={4}>
          <TextInputBox
            title="Name"
            value={name}
            onchange={handleChange}
            placeholder="Enter Name"
            errorText={errorText}
            isRequired={true}
          />
        </Col>
        <Col lg={2} className="align-content-end">
          <Button style={{ background: "#002244" }} onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            style={{ background: "#002244" }}
            className=" float-end "
            onClick={handleReset}
          >
            Reset
          </Button>
        </Col>
      </Row>
    </div>
  );
}
