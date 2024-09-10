import React,{useEffect,useState}from "react";
import TextInputBox from '../userManagementModals/TextInputBox';
import { Modal, Row, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { adduser } from "../../component/axios/Service";
import { useSelector } from "react-redux";
import { admindetails } from "../../component/axios/Service";
import { updateuser } from "../../component/axios/Service";
import CountryDropdown from "./CountryDropdown";
import DealerIdDropdown from "./DealerIdDropdown";

export default function CreateModel({ show, handleClose,apical,usertype,editData ,dealeruserList}) {
  const objectToken = useSelector((state) => state.authLogin);
  const [data, setData] = useState([]);
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
    userType: Yup.string()
      .matches(/^[a-zA-Z0-9$]+$/, "Type is invalid")
      .optional("Type is required"),
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
 
    
   
    const handleupdateuser=(values)=>{
      let formdata = new FormData();
      formdata.append("name", values.name);
      formdata.append("userName", values.userName);
      formdata.append("phoneNumber", values.phoneNumber);
      formdata.append("userType", values.userType);
      formdata.append("device_type", "2");
      formdata.append("token", objectToken.token);
      formdata.append("email", values.email);
      formdata.append("landline_number", values.landline_number);
      formdata.append("state", values.state);
      formdata.append("city", values.city);
      formdata.append("country", values.country);
      formdata.append("password", values.password);
      formdata.append("pincode", values.pincode);
      formdata.append("dealer_id", values.dealer_id);
      formdata.append("userId",editData.userId);
      console.log(formdata);
      updateuser(formdata).then((response)=>{
      console.log('UserUpdated Successfully',response.data.data);
      apical();
      handleClose();
  })
    }
    
   const handleadduser=(values)=>{
    let formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("userName", values.userName);
    formdata.append("phoneNumber", values.phoneNumber);
    formdata.append("userType", values.userType);
    formdata.append("device_type", "2");
    formdata.append("token", objectToken.token);
    formdata.append("email", values.email);
    formdata.append("landline_number", values.landline_number);
    formdata.append("state", values.state);
    formdata.append("city", values.city);
    formdata.append("country", values.country);
    formdata.append("password", values.password);
    formdata.append("pincode", values.pincode);
    formdata.append("dealer_id", values.dealer_id);
    console.log(formdata);
     adduser(formdata)
      .then((response) => {
        window.alert(response?.data?.msg);
        console.log(response.data.data, "created successfully");
        apical();

        handleClose();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  
   }

  
  console.log(editData,"edidtdtdtdt");

  
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name:editData?.name ||  "",
        userName:editData?.userName ||  "",
        phoneNumber:editData?.phoneNumber || "",
        userType: usertype || "",
        email:editData?.email || "",
        landline_number: editData?.landline_number || "",
        state: "",
        city: "",
        country: "",
        password: "",
        pincode: "",
        dealer_id:editData?.dealer_id || "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
       
        if(editData){
          handleupdateuser(values);
       
        }
        else{
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
        style={{ maxwidth: "100%", height: "100%" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{editData ?  "Edit ":"Add"}Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    title={"user Name"}
                    value={values.userName}
                    onchange={handleChange("userName")}
                    placeholder="Enter username"
                    onBlurs={handleBlur}
                    errorText={
                      touched.userName && errors.userName
                        ? errors.userName
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
                  {/* <TextInputBox
                  title={"User Type"}
                  value={values.userType}
                  onchange={handleChange("userType")}
                  placeholder="Enter user type"
                  errorText={
                    touched.userType && errors.userType ? errors.userType : null
                  }
                /> */}

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
                    title={"State"}
                    value={values.state}
                    onchange={handleChange("state")}
                    placeholder="Enter state"
                    errorText={
                      touched.state && errors.state ? errors.state : null
                    }
                  />
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
                  <TextInputBox
                    title={"City"}
                    id="city"
                    value={values.city}
                    onchange={handleChange("city")}
                    placeholder="Enter city"
                    errorText={touched.city && errors.city ? errors.city : null}
                  />
                </Col>
                <Col>
                  <TextInputBox
                    title={"Country"}
                    value={values.country}
                    onchange={handleChange("country")}
                    placeholder="Enter country"
                    errorText={
                      touched.country && errors.country ? errors.country : null
                    }
                  />
                 {/* <CountryDropdown
                value={values.country}
                onChange={(value) => handleChange('country', value)}  
               errorText={touched.country && errors.country ? errors.country : null}
      /> */}
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                <Col>
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
                </Col>
                <Col>
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
              </Row>
            </div>

            <div className="mb-3">
              {usertype==="4"?  <DealerIdDropdown
          value={values.dealer_id}
          onChange={handleChange("dealer_id")}
          errorText={
            touched.dealer_id && errors.dealer_id ? errors.dealer_id : null
          }
         
        /> : <TextInputBox
                title={"Dealer ID"}
                value={values.dealer_id}
                onchange={handleChange("dealer_id")}
                placeholder="Enter dealer ID"
                errorText={
                  touched.dealer_id && errors.dealer_id
                    ? errors.dealer_id
                    : null
                }
                    
              />}
              {/* <TextInputBox
                title={"Dealer ID"}
                value={values.dealer_id}
                onchange={handleChange("dealer_id")}
                placeholder="Enter dealer ID"
                errorText={
                  touched.dealer_id && errors.dealer_id
                    ? errors.dealer_id
                    : null
                }
                    
              /> */}
               {/* <DealerIdDropdown
          value={values.dealer_id}
          onChange={handleChange("dealer_id")}
          errorText={
            touched.dealer_id && errors.dealer_id ? errors.dealer_id : null
          }
         
        /> */}
            </div>

            <Button
             
              type="submit"
              variant="primary"
            >{editData ?  "Update ":"Submit"}
              
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
