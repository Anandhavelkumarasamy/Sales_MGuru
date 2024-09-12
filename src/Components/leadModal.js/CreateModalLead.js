import React,{useState} from "react";
import TextInputBox from '../userManagementModals/TextInputBox';
import {  Row, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addleaduser,updateleaduser, viewleaduser } from "../../component/axios/Service";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import RequirementsDropdown from "./RequirementsDropdown";
import CustomerDropdown from "./CustomerDropdown";
import EnquiryDropdown from "./EnquiryDropdown";
import { message } from "antd";



export default function CreateModelLead() {
  const {state} = useLocation();
  
  const objectToken = useSelector((state) => state.authLogin);

  const navigate=useNavigate();
  const [viewleaddata,setviewleaddata]=useState(null);
  
   const editData=state;
  console.log(editData,"edittts")
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
    email: Yup.string().email("Invalid email format").required("Email is required"),
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
  });
 
    
   
    const handleupdateuser=(values)=>{
    // let viewlead=new FormData();
    // viewlead.append("token",objectToken.token);
    // viewlead.append("leadId",editData.data.leadId);
    // viewleaduser(viewlead).then((response)=>{
    //   setviewleaddata(response.data.data);
    // })




      let formdata = new FormData();
      formdata.append("token",objectToken.token)
      formdata.append("name",values.name);
       formdata.append("leadId",editData.data.leadId);
       formdata.append("phone_country_code",values.phone_country_code);
       formdata.append("address",values.address);
       formdata.append("phone",values.phone);
       formdata.append("requirements_id", values.requirements_id);
       console.log(formdata)
      updateleaduser(formdata).then((response)=>{
        if(response.data.status===1)
          message.success(`User ${values.name} created successfully`);
        navigate('/dashboard/leads')

  })
    }
    
    
   const handleadduserlead=(values)=>{
    let formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("phone_country_code", values.phone_country_code);
    formdata.append("landline_number", values.landline_number);
    formdata.append("whatsapp_country_code", values.whatsapp_country_code);
    formdata.append("alter_country_code", values.alter_country_code);
    formdata.append("token", objectToken.token);
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
    formdata.append("isNew", values.isNew);
    formdata.append("latitude", values.latitude);
    formdata.append("longitude", values.longitude);
    formdata.append("customerId", values.customerId);
    formdata.append("Pincode", values.Pincode);
    formdata.append("schedule_date", values.schedule_date);
    formdata.append("upload_file", values.upload_file);
    formdata.append("approximate_amount", values.approximate_amount);
    console.log(formdata,"addformdta")
    addleaduser(formdata)
      .then((response) => {
      if(response.data.status===1)
        message.success(`User ${values.name} created successfully`);
        navigate('/dashboard/leads')

    
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  
   }

  
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
         initialValues :{
            name: editData?.data?.leadName ? editData?.data?.leadName :"" ,
            phone_country_code: "",
            landline_number: "",
            whatsapp_country_code: "",
            alter_country_code: "",
            company_name:  "",
            contact_person: "",
            address:editData?.data?.address ? editData?.data?.address :"",
            area: "",
            phone: editData?.data?.mobile ? editData?.data?.mobile :"",
            email: editData?.data?.email ? editData?.data?.email :"",
            alternative_no: "",
            whatsapp_no: "",
            customer_category_id: "",
            enquiry_type_id: "",
            requirements_id:  editData?.data?.requirements_id ? editData?.data?.requirements_id :"",
            state: "",
            country: "",
            city: "",
            dealer_id: "",
            assignedTo: "",
            receivedDate: "",
            referedBy: "",
            referedPhone: "",
            refer_country_code: "",
            notes: "",
            description: "",
         isNew: "",
            latitude: "",
            longitude: "",
            customerId: "",
            Pincode: "",
            schedule_date: "",
             upload_file: "",
            approximate_amount: "",
          },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        editData?.data?handleupdateuser(values):handleadduserlead(values);
      },
    });
  
// console.log(errors,"errors");

  return (
    <div>
       <div className="container">
      <h2>{editData?.isShow ? "Edit " : "Add"} Leads</h2>
      
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Row>
                <Col>
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
                <Col>
                  <TextInputBox
                    title={"remarks"}
                    value={values.remarks}
                    onchange={handleChange("remarks")}
                    placeholder="remarks"
                    onBlurs={handleBlur}
                    errorText={
                      touched.remarks && errors.remarks
                        ? errors.remarks
                        : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
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
                </Col>
                <Col>
                  <TextInputBox
                    title={"phone_country_code"}
                    value={values.phone_country_code}
                    onchange={handleChange("phone_country_code")}
                    placeholder="Enter phone_country_code"
                    errorText={
                      touched.phone_country_code && errors.phone_country_code ? errors.phone_country_code : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
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
                <Col>
                  <TextInputBox
                    title={"whatsapp_country_code"}
                    value={values.whatsapp_country_code}
                    onchange={handleChange("whatsapp_country_code")}
                    placeholder="Enter whatsapp_country_code"
                    errorText={
                      touched.whatsapp_country_code && errors.whatsapp_country_code ? errors.whatsapp_country_code : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
                  <TextInputBox
                    title={"alter_country_code"}
                    
                    value={values.alter_country_code}
                    onchange={handleChange("alter_country_code")}
                    placeholder="Enter alter_country_code"
                    errorText={touched.alter_country_code && errors.alter_country_code ? errors.alter_country_code : null}
                  />
                </Col>
                <Col>
                  <TextInputBox
                    title={"company_name"}
                    value={values.company_name}
                    onchange={handleChange("company_name")}
                    placeholder="Enter company_name"
                    errorText={
                      touched.company_name && errors.company_name ? errors.company_name : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
                  <TextInputBox
                    title={"contact_person"}
                    value={values.contact_person}
                    onchange={handleChange("contact_person")}
                    placeholder="Enter contact_person"
                   
                    errorText={
                      touched.contact_person && errors.contact_person
                        ? errors.contact_person
                        : null
                    }
                   
                  />
                </Col>
                <Col>
                  <TextInputBox
                    title={"address"}
                    value={values.address}
                    onchange={handleChange("address")}
                    placeholder="Enter address"
                    errorText={
                      touched.address && errors.address ? errors.address : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
                  <TextInputBox
                    title={"area"}
                    value={values.area}
                    onchange={handleChange("area")}
                    placeholder="Enter area"
                   
                    errorText={
                      touched.area && errors.area
                        ? errors.area
                        : null
                    }
                   
                  />
                </Col>
                <Col>
                  <TextInputBox
                    title={"phone"}
                    value={values.phone}
                    onchange={handleChange("phone")}
                    placeholder="Enter phone"
                    errorText={
                      touched.phone && errors.phone ? errors.phone : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
                  <TextInputBox
                    title={"email"}
                    value={values.email}
                    onchange={handleChange("email")}
                    placeholder="Enter email"
                   
                    errorText={
                      touched.email && errors.email
                        ? errors.email
                        : null
                    }
                   
                  />
                </Col>
                <Col>
                  <TextInputBox
                    title={"alternative_no"}
                    value={values.alternative_no}
                    onchange={handleChange("alternative_no")}
                    placeholder="Enter alternative_no"
                    errorText={
                      touched.alternative_no && errors.alternative_no ? errors.alternative_no : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
                  <TextInputBox
                    title={"whatsapp_no"}
                    value={values.whatsapp_no}
                    onchange={handleChange("whatsapp_no")}
                    placeholder="Enter whatsapp_no"
                   
                    errorText={
                      touched.whatsapp_no && errors.whatsapp_no
                        ? errors.whatsapp_no
                        : null
                    }
                   
                  />
                </Col>
                <Col>
                
                  <CustomerDropdown 
                
                  value={values.customer_category_id}
                  onChange={handleChange("customer_category_id")}
                   errorText={touched.customer_category_id && errors.customer_category_id ? errors.customer_category_id : null}
                  
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
               
                  <EnquiryDropdown
                  value={values.enquiry_type_id}
                  onChange={handleChange("enquiry_type_id")}
                   errorText={touched.enquiry_type_id && errors.enquiry_type_id ? errors.enquiry_type_id : null}
                  />
                </Col>
                <Col>
                
                  <RequirementsDropdown
                  value={values.requirements_id}
                  onChange={handleChange("requirements_id")}
                   errorText={touched.requirements_id && errors.requirements_id ? errors.requirements_id : null}
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
                  <TextInputBox
                    title={"state"}
                    value={values.state}
                    onchange={handleChange("state")}
                    placeholder="state"
                   
                    errorText={
                      touched.state && errors.state
                        ? errors.state
                        : null
                    }
                   
                  />
                </Col>
                <Col>
                  <TextInputBox
                    title={"country"}
                    value={values.country}
                    onchange={handleChange("country")}
                    placeholder="Enter country"
                    errorText={
                      touched.country && errors.country ? errors.country : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
                  <TextInputBox
                    title={"city"}
                    value={values.city}
                    onchange={handleChange("city")}
                    placeholder="Enter city"
                   
                    errorText={
                      touched.city && errors.city
                        ? errors.city
                        : null
                    }
                   
                  />
                </Col>
                <Col>
                  <TextInputBox
                    title={"assignedTo"}
                    value={values.assignedTo}
                    onchange={handleChange("assignedTo")}
                    placeholder="Enter assignedTo"
                    errorText={
                      touched.assignedTo && errors.assignedTo ? errors.assignedTo : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
                  <TextInputBox
                    title={"receivedDate"}
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
                <Col>
                  <TextInputBox
                    title={"referedBy"}
                    value={values.referedBy}
                    onchange={handleChange("referedBy")}
                    placeholder="Enter referedBy"
                    errorText={
                      touched.referedBy && errors.referedBy ? errors.referedBy : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
                  <TextInputBox
                    title={"referedPhone"}
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
                <Col>
                  <TextInputBox
                    title={"refer_country_code"}
                    value={values.refer_country_code}
                    onchange={handleChange("refer_country_code")}
                    placeholder="Enter refer_country_code"
                    errorText={
                      touched.refer_country_code && errors.refer_country_code ? errors.customer_category_id : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
                  <TextInputBox
                    title={"notes"}
                    value={values.notes}
                    onchange={handleChange("notes")}
                    placeholder="Enter notes"
                   
                    errorText={
                      touched.notes && errors.notes
                        ? errors.notes
                        : null
                    }
                   
                  />
                </Col>
                <Col>
                  <TextInputBox
                    title={"description"}
                    value={values.description}
                    onchange={handleChange("description")}
                    placeholder="Enter description"
                    errorText={
                      touched.description && errors.description ? errors.customer_category_id : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
                  <TextInputBox
                    title={"isNew"}
                    value={values.isNew}
                    onchange={handleChange("isNew")}
                    placeholder="Enter isNew"
                   
                    errorText={
                      touched.isNew && errors.isNew
                        ? errors.isNew
                        : null
                    }
                   
                  />
                </Col>
                <Col>
                  <TextInputBox
                    title={"latitude"}
                    value={values.latitude}
                    onchange={handleChange("latitude")}
                    placeholder="Enter latitude"
                    errorText={
                      touched.latitude && errors.latitude ? errors.customer_category_id : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
                  <TextInputBox
                    title={"longitude"}
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
                <Col>
                  <TextInputBox
                    title={"customerId"}
                    value={values.customerId}
                    onchange={handleChange("customerId")}
                    placeholder="Enter customerId"
                    errorText={
                      touched.customerId && errors.customerId ? errors.customer_category_id : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
                  <TextInputBox
                    title={"Pincode"}
                    value={values.Pincode}
                    onchange={handleChange("Pincode")}
                    placeholder="Enter Pincode"
                   
                    errorText={
                      touched.Pincode && errors.Pincode
                        ? errors.Pincode
                        : null
                    }
                   
                  />
                </Col>
                <Col>
                  <TextInputBox
                    title={"schedule_date"}
                    value={values.schedule_date}
                    onchange={handleChange("schedule_date")}
                    placeholder="Enter schedule_date"
                    errorText={
                      touched.schedule_date && errors.schedule_date ? errors.schedule_date : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
                  <TextInputBox
                    title={"upload_file"}
                    value={values.upload_file}
                    onchange={handleChange("upload_file")}
                    placeholder="Enter upload_file"
                   
                    errorText={
                      touched.upload_file && errors.upload_file
                        ? errors.upload_file
                        : null
                    }
                   
                  />
                </Col>
                <Col>
                  <TextInputBox
                    title={"approximate_amount"}
                    value={values.approximate_amount}
                    onchange={handleChange("approximate_amount")}
                    placeholder="Enter approximate_amount"
                    errorText={
                      touched.approximate_amount && errors.approximate_amount ? errors.schedule_date : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
         <TextInputBox
                title={"Dealer ID"}
                value={values.dealer_id}
                onchange={handleChange("dealer_id")}
                placeholder="Enter dealer ID"
                errorText={
                  touched.dealer_id && errors.dealer_id
                    ? errors.dealer_id
                    : null
                }
                    
              />
              
             
            </div>

            <Button
            type="submit"
              
              variant="primary"
            >{editData?.isShow ?  "Update ":"Submit"}
              
            </Button>

            <Button
            onClick={()=>{navigate('/dashboard/leads')}}
            className="float-end"
              variant="primary"
            >Back
              
            </Button>
          </form>
     </div>
    </div>
  );
}
