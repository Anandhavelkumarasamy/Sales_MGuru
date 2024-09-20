import React from "react";
import TextInputBox from "../userManagementModals/TextInputBox";
import { Modal, Row, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { adduser } from "../../component/axios/Service";
import { useSelector } from "react-redux";
import { updateuser } from "../../component/axios/Service";
import DealerIdDropdown from "./DealerIdDropdown";
import { message } from "antd";
import { useToken } from "../../utility/hooks";
import {
  createmodalprops,
  handleadduserprops,
} from "../../@types/createmodalprops";

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z0-9$]+$/, "Name is invalid")
    .required("Name is required"),
  userName: Yup.string()
    .matches(/^[a-zA-Z0-9$]+$/, "Username is invalid")
    .required("Username is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9$]+$/, "Phone number is invalid")
    .required("Phone number is required"),
  // userType: Yup.string()
  //   .matches(/^[a-zA-Z0-9$]+$/, "Type is invalid")
  //   .optional("Type is required"),
  email: Yup.string().email("The email is incorrect"),
  landline_number: Yup.string().matches(
    /^[0-9$]+$/,
    "Landline number is invalid"
  ),
  state: Yup.string().matches(/^[a-zA-Z$]+$/, "State is invalid"),
  city: Yup.string().matches(/^[a-zA-Z$]+$/, "City is invalid"),
  country: Yup.string().matches(/^[a-zA-Z$]+$/, "Country is invalid"),
  password: Yup.string().matches(/^[a-zA-Z0-9$]+$/, "Password is invalid"),
  pincode: Yup.string().matches(/^[a-zA-Z0-9$]+$/, "Pincode is invalid"),
  dealer_id: Yup.string().matches(/^[a-zA-Z0-9$]+$/, "Dealer ID is invalid"),
});

export default function CreateModel({
  show,
  handleClose,
  handleGetListUseres,
  usertype,
  editData,
}: createmodalprops) {
  const token = useToken();

  const handleupdateuser = (values: handleadduserprops) => {
    let formdata = new FormData();
    formdata.append("name", values.name || "");
    formdata.append("userName", values.userName);
    formdata.append("phoneNumber", values.phoneNumber);
    formdata.append("userType", values.userType);
    formdata.append("device_type", "2");
    formdata.append("token", token);
    formdata.append("email", values.email || "");
    formdata.append("landline_number", values.landline_number || "");
    formdata.append("state", values.state || "");
    formdata.append("city", values.city || "");
    formdata.append("country", values.country || "");
    formdata.append("password", values.password || "");
    formdata.append("pincode", values.pincode || "");
    formdata.append("dealer_id", values.dealer_id || "");
    formdata.append("userId", editData?.userId || "");
    console.log(formdata);
    updateuser(formdata).then((response) => {
      if (response.data.status === 1) {
        message.success(`User ${values.userName} created successfully`);
        // console.log("UserUpdated Successfully", response.data.data);
        handleGetListUseres(1, 10, {});
      }
      handleClose();
    });
  };

  const handleadduser = (values: handleadduserprops) => {
    let formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("userName", values.userName);
    formdata.append("phoneNumber", values.phoneNumber);
    formdata.append("userType", values.userType);
    formdata.append("device_type", "2");
    formdata.append("token", token);
    formdata.append("email", values.email || "");
    formdata.append("landline_number", values.landline_number || "");
    formdata.append("state", values.state || "");
    formdata.append("city", values.city || "");
    formdata.append("country", values.country || "");
    formdata.append("password", values.password || "");
    formdata.append("pincode", values.pincode || "");
    formdata.append("dealer_id", values.dealer_id || "");
    console.log(formdata);
    adduser(formdata)
      .then((response) => {
        // window.alert(response?.data?.msg);
        if (response?.data?.status === 1) {
          message.success(`User ${values.userName} created successfully`);
          // console.log(response.data.data, "created successfully");
          handleGetListUseres(1, 10, {});
        }

        handleClose();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  console.log(editData, "edidtdtdtdt");

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: editData?.name || "",
        userName: editData?.userName || "",
        phoneNumber: editData?.phoneNumber || "",
        userType: usertype || "",
        email: editData?.email || "",
        landline_number: editData?.landline_number || "",
        state: "",
        city: "",
        country: "",
        password: "",
        pincode: "",
        dealer_id: editData?.dealer_id || "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        if (editData) {
          handleupdateuser(values);
        } else {
          handleadduser(values);
        }
      },
    });
  // console.log(values,"values",editData?.userName);
  // console.log(dealeruserlist)

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        style={{ maxWidth: "100%", height: "100%" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{editData ? "Edit " : "Add"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <TextInputBox
                    title={"Name"}
                    value={values.name}
                    onchange={handleChange("name")}
                    placeholder="Enter name"
                    onBlurs={handleBlur}
                    errorText={touched.name && errors.name ? errors.name : null}
                    isRequired={true}
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <TextInputBox
                    title={"User Name"}
                    value={values.userName}
                    onchange={handleChange("userName")}
                    placeholder="Enter username"
                    onBlurs={handleBlur}
                    errorText={
                      touched.userName && errors.userName
                        ? errors.userName
                        : null
                    }
                    isRequired={true}
                  />
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <TextInputBox
                    title={"Phone Number"}
                    value={values.phoneNumber}
                    onchange={handleChange("phoneNumber")}
                    placeholder="Enter phone Number"
                    errorText={
                      touched.phoneNumber && errors.phoneNumber
                        ? errors.phoneNumber
                        : null
                    }
                    isRequired={true}
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <TextInputBox
                    title={"Email"}
                    value={values.email}
                    onchange={handleChange("email")}
                    placeholder="Enter email"
                    errorText={
                      touched.email && errors.email ? errors.email : null
                    }
                    isRequired={true}
                  />
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <TextInputBox
                    title={"Landline Number"}
                    value={values.landline_number}
                    onchange={handleChange("landline_number")}
                    placeholder="Enter landline number"
                    errorText={
                      touched.landline_number && errors.landline_number
                        ? errors.landline_number
                        : null
                    }
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <TextInputBox
                    title={"State"}
                    value={values.state}
                    onchange={handleChange("state")}
                    placeholder="Enter state"
                    errorText={
                      touched.state && errors.state ? errors.state : null
                    }
                  />
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <TextInputBox
                    title={"City"}
                    value={values.city}
                    onchange={handleChange("city")}
                    placeholder="Enter city"
                    errorText={touched.city && errors.city ? errors.city : null}
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <TextInputBox
                    title={"Country"}
                    value={values.country}
                    onchange={handleChange("country")}
                    placeholder="Enter country"
                    errorText={
                      touched.country && errors.country ? errors.country : null
                    }
                  />
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <TextInputBox
                    title={"Pincode"}
                    value={values.pincode}
                    onchange={handleChange("pincode")}
                    placeholder="Enter pincode"
                    errorText={
                      touched.pincode && errors.pincode ? errors.pincode : null
                    }
                  />
                </Col>

                <Col lg={6} md={6} sm={12}>
                  {usertype === "4" && (
                    <DealerIdDropdown
                      value={values.dealer_id}
                      onChange={handleChange("dealer_id")}
                      errorText={
                        touched.dealer_id && errors.dealer_id
                          ? errors.dealer_id
                          : null
                      }
                    />
                  )}
                </Col>

                <Col lg={6} md={6} sm={12}>
                  {!editData && (
                    <TextInputBox
                      title={"Password"}
                      value={values.password}
                      onchange={handleChange("password")}
                      placeholder="Enter password"
                      isPassword={true}
                      errorText={
                        touched.password && errors.password
                          ? errors.password
                          : null
                      }
                    />
                  )}
                </Col>
              </Row>
            </div>

            <Button type="submit" style={{ background: "#002244" }}>
              {editData ? "Update " : "Submit"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
