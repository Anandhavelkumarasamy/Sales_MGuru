import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import TextInputBox from "../userManagementModals/TextInputBox";
import { paginationProps } from "../../@types/admin";

interface LeadFilterProps {
  handleleadsuserList: (
    page: number,
    size: number,
    items: leadFilteItems
  ) => void;
}

interface leadFilteItems {
  leadName: string;
  state: string;
  mobile: string;
}
const LeadFilter = ({ handleleadsuserList }: LeadFilterProps) => {
  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      leadName: "",
      state: "",
      mobile: "",
    },
    onSubmit: (values) => {
      handleleadsuserList(1, 10, values);
      console.log(values, "leadvalues");
    },
  });

  const handlereset = () => {
    const emptyValues = {
      leadName: "",
      state: "",
      mobile: "",
    };
    handleleadsuserList(1, 10, emptyValues);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <TextInputBox
            title={"Lead Name"}
            value={values.leadName}
            onchange={handleChange("leadName")}
            placeholder="Enter leadName"
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
            title={"State"}
            value={values.state}
            onchange={handleChange("state")}
            placeholder="Enter state"
          />
        </Col>
      </Row>

      <Button
        variant="primary"
        onClick={() => handleSubmit()}
        style={{ background: "#002244" }}
        className="float-end mt-2 mb-4 "
      >
        Search
      </Button>
      <Button
        variant="primary"
        onClick={handlereset}
        style={{ background: "#002244" }}
        className="float-end me-3 mt-2"
      >
        Reset
      </Button>
    </form>
  );
};

export default LeadFilter;
