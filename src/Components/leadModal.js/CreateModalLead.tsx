import React, { useEffect, useState } from "react";
import TextInputBox from "../userManagementModals/TextInputBox";
import { Row, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  addleaduser,
  customerrequirementsdropdown,
  employdropdown,
  enquirydropdown,
  requirementsdropdown,
  updateleaduser,
} from "../../component/axios/Service";

import { useLocation, useNavigate } from "react-router-dom";

import { message } from "antd";

import AssignedDealerdropdown from "./AssignedDealerdropdown";
import { useToken } from "../../utility/hooks";
import {
  addleaduserprops,
  updateleaduserprops,
} from "../../@types/createmodalleadprops";
import Dropdown from "./Dropdown";
import { customercategorydataprops } from "../../@types/customerdropdown";
import { enquirydata } from "../../@types/enquirydropdown";
import { requirementdropdownprops } from "../../@types/requirementsdropdown";
import { storedataprops } from "../../@types/store";
import { useSelector } from "react-redux";
import { employeedataprops } from "../../@types/assignedemployeedropdown";

export default function CreateModelLead() {
  const { state } = useLocation();
  const token = useToken();

  const navigate = useNavigate();
  // const [viewleaddata,setviewleaddata]=useState(null);

  const editData = state;
  console.log(editData, "edittts");
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone_country_code: Yup.string().required("Phone country code is required"),
    landline_number: Yup.string(),
    whatsapp_country_code: Yup.string(),
    alter_country_code: Yup.string(),
    company_name: Yup.string(),
    contact_person: Yup.string(),
    address: Yup.string().required("Address is required"),
    area: Yup.string(),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    alternative_no: Yup.string(),
    whatsapp_no: Yup.string(),
    customer_category_id: Yup.string(),
    enquiry_type_id: Yup.string(),
    requirements_id: Yup.string().required("Requirements is required"),
    state: Yup.string(),
    country: Yup.string(),
    city: Yup.string(),
    dealer_id: Yup.string(),
    assignedTo: Yup.string(),
    receivedDate: Yup.date(),
    referedBy: Yup.string(),
    referedPhone: Yup.string(),
    refer_country_code: Yup.string(),
    notes: Yup.string(),
    description: Yup.string(),
    isNew: Yup.boolean(),
    latitude: Yup.string(),
    longitude: Yup.string(),
    customerId: Yup.string(),
    Pincode: Yup.string(),
    schedule_date: Yup.date(),
    upload_file: Yup.mixed().nullable(),
    approximate_amount: Yup.number(),
    requirement: Yup.string(),
  });

  const handleupdateuser = (values: updateleaduserprops) => {
    // let viewlead=new FormData();
    // viewlead.append("token",token.token);
    // viewlead.append("leadId",editData.data.leadId);
    // viewleaduser(viewlead).then((response)=>{
    //   setviewleaddata(response.data.data);
    // })

    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("name", values.name);
    formdata.append("leadId", editData.data.leadId);
    formdata.append("phone_country_code", values.phone_country_code);
    formdata.append("address", values.address);
    formdata.append("phone", values.phone);
    formdata.append("requirements_id", values.requirements_id);
    console.log(formdata);
    updateleaduser(formdata).then((response) => {
      if (response.data.status === 1)
        message.success(`User ${values.name} created successfully`);
      navigate("/dashboard/leads");
    });
  };

  const handleadduserlead = (values: addleaduserprops) => {
    let formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("phone_country_code", values.phone_country_code);
    formdata.append("landline_number", values.landline_number);
    formdata.append("whatsapp_country_code", values.whatsapp_country_code);
    formdata.append("alter_country_code", values.alter_country_code);
    formdata.append("token", token);
    formdata.append("company_name", values.company_name);
    formdata.append("contact_person", values.contact_person);
    formdata.append("address", values.address);
    formdata.append("area", values.area);
    formdata.append("phone", values.phone);
    formdata.append("email", values.email);
    formdata.append("alternative_no", values.alternative_no);
    formdata.append("whatsapp_no", values.whatsapp_no);
    formdata.append("customer_category_id", values.customer_category_id);
    formdata.append("enquiry_type_id", values.enquiry_type_id);
    formdata.append("requirements_id", values.requirements_id);
    formdata.append("state", values.state);
    formdata.append("country", values.country);
    formdata.append("city", values.city);
    formdata.append("dealer_id", values.dealer_id);
    formdata.append("assignedTo", values.assignedTo);
    formdata.append("receivedDate", values.receivedDate);
    formdata.append("referedBy", values.referedBy);
    formdata.append("referedPhone", values.referedPhone);
    formdata.append("refer_country_code", values.refer_country_code);
    formdata.append("notes", values.notes);
    formdata.append("description", values.description);
    formdata.append("isNew", values.isNew.toString());
    formdata.append("latitude", values.latitude);
    formdata.append("longitude", values.longitude);
    formdata.append("customerId", values.customerId);
    formdata.append("Pincode", values.Pincode);
    formdata.append("schedule_date", values.schedule_date);

    if (values.upload_file) {
      formdata.append("upload_file", values.upload_file);
    }

    formdata.append("approximate_amount", values.approximate_amount);

    addleaduser(formdata)
      .then((response) => {
        if (response.data.status === 1) {
          message.success(`User ${values.name} created successfully`);
          navigate("/dashboard/leads");
        } else {
          message.error("Error creating user");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        message.error("An error occurred while creating the user");
      });
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: editData?.data?.leadName ? editData?.data?.leadName : "",
      phone_country_code: editData?.data?.phone_country_code
        ? editData?.data?.phone_country_code
        : "",
      landline_number: editData?.data?.landline_number
        ? editData?.data?.landline_number
        : "",
      whatsapp_country_code: editData?.data?.whatsapp_country_code
        ? editData?.data?.whatsapp_country_code
        : "",
      alter_country_code: editData?.data?.alter_country_code
        ? editData?.data?.alter_country_code
        : "",
      company_name: editData?.data?.companyName
        ? editData?.data?.companyName
        : "",
      contact_person: "",
      address: editData?.data?.address ? editData?.data?.address : "",
      area: editData?.data?.area ? editData?.data?.area : "",
      phone: editData?.data?.mobile ? editData?.data?.mobile : "",
      email: editData?.data?.email ? editData?.data?.email : "",
      alternative_no: "",
      whatsapp_no: editData?.data?.whatsapp_no
        ? editData?.data?.whatsapp_no
        : "",
      customer_category_id: "",
      enquiry_type_id: "",
      requirements_id: editData?.data?.requirements_id
        ? editData?.data?.requirements_id
        : "",
      state: "",
      country: "",
      city: "",
      dealer_id: "",
      assignedTo: "",
      receivedDate: "",
      referedBy: "",
      referedPhone: "",
      refer_country_code: editData?.data?.refer_country_code
        ? editData?.data?.refer_country_code
        : "",
      notes: "",
      description: "",
      isNew: "",
      latitude: "",
      longitude: "",
      customerId: "",
      Pincode: "",
      schedule_date: "",
      upload_file: "",
      approximate_amount: editData?.data?.approximate_amount
        ? editData?.data?.approximate_amount
        : "",
      remarks: "",
      category: "",
      // requirement: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      editData?.data ? handleupdateuser(values) : handleadduserlead(values);
    },
  });

  // console.log(errors,"errors");
  const [requirementsdata, setRequirementsdata] = useState<
    customercategorydataprops[]
  >([]);

  console.log(values?.category, "cate");

  console.log(errors, "errors");

  const handledropdownrequirements = () => {
    let formdata = new FormData();
    formdata.append("token", token);
    customerrequirementsdropdown(formdata)
      .then((response) => {
        console.log(response, "requirements dropdown");
        setRequirementsdata(response.data.data);
      })
      .catch((error) => console.log("requirementsdropdownerror", error));
  };

  useEffect(() => {
    handledropdownrequirements();
  }, [token]);
  const [enquirydata, setEnquirydata] = useState<enquirydata[]>([]);

  const handledropdownenquiry = () => {
    let formdata = new FormData();
    formdata.append("token", token);
    enquirydropdown(formdata)
      .then((response) => {
        console.log(response, "requirements dropdown");
        setEnquirydata(response.data.data);
      })
      .catch((error) => console.log("requirementsdropdownerror", error));
  };
  useEffect(() => {
    handledropdownenquiry();
  }, [token]);

  const [requirementsvalue, setRequirementsvalue] = useState<
    requirementdropdownprops[]
  >([]);

  const handlerequirements = () => {
    let formdata = new FormData();
    formdata.append("token", token);
    requirementsdropdown(formdata)
      .then((response) => {
        console.log(response, "requirements dropdown");
        setRequirementsvalue(response.data.data);
      })
      .catch((error) => console.log("requirementsdropdownerror", error));
  };
  useEffect(() => {
    handlerequirements();
  }, [token]);

  const selector = useSelector(
    (state: storedataprops) => state.authLogin.assignedselecteddealerid
  );
  console.log(selector, "selectedidddddd");

  const [employeedata, setemployeedata] = useState<employeedataprops[]>([]);

  useEffect(() => {
    if (selector) {
      handleemployeestatus();
    }
  }, [token, selector]);
  console.log(selector, "dealerrrrrrr");
  const handleemployeestatus = () => {
    if (token) {
      let formdata = new FormData();
      formdata.append("token", token);
      employdropdown(formdata)
        .then((response) => {
          setemployeedata(response.data.data);
          console.log(response.data.data, "employeedropdown");
        })
        .catch((error) => {
          console.log(error, "employdropdownerror");
        });
    }
  };

  return (
    <div>
      <div className="container">
        <h2>{editData?.isShow ? "Edit " : "Add"} Leads</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Row>
              <Col lg={4} md={6} sm={12} className="mt-3">
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

              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Remarks"}
                  value={values.remarks}
                  onchange={handleChange("remarks")}
                  placeholder="remarks"
                  onBlurs={handleBlur}
                  errorText={errors.name && touched.name ? errors.name : null}
                />
              </Col>
              {/* <Col lg={4} md={6} sm={12}  className="mt-3">
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
                  />
                </Col> */}

              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Phone Country Code"}
                  value={values.phone_country_code}
                  onchange={handleChange("phone_country_code")}
                  placeholder="Enter phone country code"
                  errorText={
                    touched.phone_country_code && errors.phone_country_code
                      ? errors.phone_country_code
                      : null
                  }
                  isRequired={true}
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
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
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Whatsapp Country Code"}
                  value={values.whatsapp_country_code}
                  onchange={handleChange("whatsapp_country_code")}
                  placeholder="Enter whatsapp country code"
                  errorText={
                    touched.whatsapp_country_code &&
                    errors.whatsapp_country_code
                      ? errors.whatsapp_country_code
                      : null
                  }
                />
              </Col>

              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Alter Country Code"}
                  value={values.alter_country_code}
                  onchange={handleChange("alter_country_code")}
                  placeholder="Enter alter country code"
                  errorText={
                    touched.alter_country_code && errors.alter_country_code
                      ? errors.alter_country_code
                      : null
                  }
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Company Name"}
                  value={values.company_name}
                  onchange={handleChange("company_name")}
                  placeholder="Enter company_name"
                  errorText={
                    touched.company_name && errors.company_name
                      ? errors.company_name
                      : null
                  }
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Contact Person"}
                  value={values.contact_person}
                  onchange={handleChange("contact_person")}
                  placeholder="Enter contact person"
                  errorText={
                    touched.contact_person && errors.contact_person
                      ? errors.contact_person
                      : null
                  }
                />
              </Col>

              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Address"}
                  value={values.address}
                  onchange={handleChange("address")}
                  placeholder="Enter address"
                  errorText={
                    touched.address && errors.address ? errors.address : null
                  }
                  isRequired={true}
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Area"}
                  value={values.area}
                  onchange={handleChange("area")}
                  placeholder="Enter area"
                  errorText={touched.area && errors.area ? errors.area : null}
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Phone"}
                  value={values.phone}
                  onchange={handleChange("phone")}
                  placeholder="Enter phone"
                  errorText={
                    touched.phone && errors.phone ? errors.phone : null
                  }
                  isRequired={true}
                />
              </Col>

              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Email"}
                  value={values.email}
                  onchange={handleChange("email")}
                  placeholder="Enter email"
                  errorText={
                    touched.email && errors.email ? errors.email : null
                  }
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Alternative No"}
                  value={values.alternative_no}
                  onchange={handleChange("alternative_no")}
                  placeholder="Enter alternative no"
                  errorText={
                    touched.alternative_no && errors.alternative_no
                      ? errors.alternative_no
                      : null
                  }
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Whatsapp No"}
                  value={values.whatsapp_no}
                  onchange={handleChange("whatsapp_no")}
                  placeholder="Enter whatsapp No"
                  errorText={
                    touched.whatsapp_no && errors.whatsapp_no
                      ? errors.whatsapp_no
                      : null
                  }
                />
              </Col>

              <Col lg={4} md={6} sm={12} className="mt-3">
                {/* <CustomerDropdown
                  value={values.customer_category_id}
                  onChange={handleChange("customer_category_id")}
                  errorText={
                    touched.customer_category_id && errors.customer_category_id
                      ? errors.customer_category_id
                      : null
                  }
                /> */}
                <Dropdown
                  dropdowndata={requirementsdata}
                  dropdowntitle={"Category"}
                  dropdownid="categoryId"
                  dropdownname="categoryName"
                  value={values.customer_category_id}
                  onChange={(val) => setFieldValue("customer_category_id", val)}
                  errorText={errors.customer_category_id}
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                {/* <EnquiryDropdown
                  value={values.enquiry_type_id}
                  onChange={handleChange("enquiry_type_id")}
                  errorText={
                    touched.enquiry_type_id && errors.enquiry_type_id
                      ? errors.enquiry_type_id
                      : null
                  }
                /> */}
                <Dropdown
                  dropdowndata={enquirydata}
                  dropdowntitle={"Enquiry"}
                  dropdownid={"enquiryId"}
                  dropdownname={"enquiryName"}
                  value={values.enquiry_type_id}
                  onChange={(val) => setFieldValue("enquiry_type_id", val)}
                  errorText={errors.enquiry_type_id}
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                {/* <RequirementsDropdown
                  value={values.requirements_id}
                  onChange={handleChange("requirements_id")}
                  errorText={
                    touched.requirements_id && errors.requirements_id
                      ? errors.requirements_id
                      : null
                  }
                /> */}
                <Dropdown
                  dropdowndata={requirementsvalue}
                  dropdowntitle={"requirement"}
                  dropdownid={"RequirementsId"}
                  dropdownname={"RequirementsName"}
                  value={values.requirements_id}
                  onChange={(val) => {
                    console.log(val, "value");

                    setFieldValue("requirements_id", val);
                  }}
                  errorText={errors.requirements_id}
                />
              </Col>

              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"State"}
                  value={values.state}
                  onchange={handleChange("state")}
                  placeholder="state"
                  errorText={
                    touched.state && errors.state ? errors.state : null
                  }
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
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
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"City"}
                  value={values.city}
                  onchange={handleChange("city")}
                  placeholder="Enter city"
                  errorText={touched.city && errors.city ? errors.city : null}
                />
              </Col>

              <Col lg={4} md={6} sm={12} className="mt-3">
                {/* <AssignedEmployeedropdown
                  //  value={values.assignedTo}
                  onchangeid={handleChange("assignedTo")}
                  errorText={
                    touched.assignedTo && errors.assignedTo
                      ? errors.assignedTo
                      : null
                  }
                /> */}
                <Dropdown
                  dropdowndata={employeedata}
                  dropdowntitle={"Assigned Employee"}
                  dropdownid={"userId"}
                  dropdownname={"userName"}
                  value={values.assignedTo}
                  onChange={(val) => setFieldValue("assignedTo", val)}
                  errorText={errors.assignedTo}
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Received Date"}
                  value={values.receivedDate}
                  onchange={handleChange("receivedDate")}
                  placeholder="Enter receivedDate"
                  errorText={
                    touched.receivedDate && errors.receivedDate
                      ? errors.receivedDate
                      : null
                  }
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Refered By"}
                  value={values.referedBy}
                  onchange={handleChange("referedBy")}
                  placeholder="Enter referedBy"
                  errorText={
                    touched.referedBy && errors.referedBy
                      ? errors.referedBy
                      : null
                  }
                />
              </Col>

              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Refered Phone"}
                  value={values.referedPhone}
                  onchange={handleChange("referedPhone")}
                  placeholder="Enter referedPhone"
                  errorText={
                    touched.referedPhone && errors.referedPhone
                      ? errors.referedPhone
                      : null
                  }
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Refer Country Code"}
                  value={values.refer_country_code}
                  onchange={handleChange("refer_country_code")}
                  placeholder="Enter refer country code"
                  errorText={
                    touched.refer_country_code && errors.refer_country_code
                      ? errors.customer_category_id
                      : null
                  }
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Notes"}
                  value={values.notes}
                  onchange={handleChange("notes")}
                  placeholder="Enter notes"
                  errorText={
                    touched.notes && errors.notes ? errors.notes : null
                  }
                />
              </Col>

              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Description"}
                  value={values.description}
                  onchange={handleChange("description")}
                  placeholder="Enter description"
                  errorText={
                    touched.description && errors.description
                      ? errors.customer_category_id
                      : null
                  }
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"IsNew"}
                  value={values.isNew}
                  onchange={handleChange("isNew")}
                  placeholder="Enter isNew"
                  errorText={
                    touched.isNew && errors.isNew ? errors.isNew : null
                  }
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Latitude"}
                  value={values.latitude}
                  onchange={handleChange("latitude")}
                  placeholder="Enter latitude"
                  errorText={
                    touched.latitude && errors.latitude
                      ? errors.customer_category_id
                      : null
                  }
                />
              </Col>

              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Longitude"}
                  value={values.longitude}
                  onchange={handleChange("longitude")}
                  placeholder="Enter longitude"
                  errorText={
                    touched.longitude && errors.longitude
                      ? errors.longitude
                      : null
                  }
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Customer Id"}
                  value={values.customerId}
                  onchange={handleChange("customerId")}
                  placeholder="Enter customerId"
                  errorText={
                    touched.customerId && errors.customerId
                      ? errors.customer_category_id
                      : null
                  }
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Pincode"}
                  value={values.Pincode}
                  onchange={handleChange("Pincode")}
                  placeholder="Enter Pincode"
                  errorText={
                    touched.Pincode && errors.Pincode ? errors.Pincode : null
                  }
                />
              </Col>

              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Schedule Date"}
                  value={values.schedule_date}
                  onchange={handleChange("schedule_date")}
                  placeholder="Enter schedule Date"
                  errorText={
                    touched.schedule_date && errors.schedule_date
                      ? errors.schedule_date
                      : null
                  }
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Upload File"}
                  value={values.upload_file}
                  onchange={handleChange("upload_file")}
                  placeholder="Enter upload File"
                  errorText={
                    touched.upload_file && errors.upload_file
                      ? errors.upload_file
                      : null
                  }
                />
              </Col>
              <Col lg={4} md={6} sm={12} className="mt-3">
                <TextInputBox
                  title={"Approximate Amount"}
                  value={values.approximate_amount}
                  onchange={handleChange("approximate_amount")}
                  placeholder="Enter approximate amount"
                  errorText={
                    touched.approximate_amount && errors.approximate_amount
                      ? errors.schedule_date
                      : null
                  }
                />
              </Col>

              <Col lg={4} md={6} sm={12}>
                <AssignedDealerdropdown
                  value={values.dealer_id}
                  onChange={handleChange("dealer_id")}
                  errorText={
                    touched.dealer_id && errors.dealer_id
                      ? errors.dealer_id
                      : null
                  }
                />
              </Col>
            </Row>
          </div>

          <Button type="submit" style={{ background: "#002244" }}>
            {editData?.isShow ? "Update " : "Submit"}
          </Button>

          <Button
            onClick={() => {
              navigate("/dashboard/leads");
            }}
            className="float-end"
            style={{ background: "#002244" }}
          >
            Back
          </Button>
        </form>
      </div>
    </div>
  );
}
