import React from 'react';
import TextInputBox from '../../../Components/userManagementModals/TextInputBox';
import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { forgotpassword } from '../../axios/Service';
import { useNavigate } from 'react-router-dom';
import loginimage from '../../assests/4957136.jpg';
import classes from './Login.module.css'; 
import { message } from 'antd';

export default function ForgotPassword() {

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required')
  });

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: (values) => {handleForgotpassword(values); }
  });

  const handleForgotpassword = (values) => {
    let formdata = new FormData();
    formdata.append("email", values.email);
    forgotpassword(formdata).then((response) => {
      let resetkey = response.data.reset_key;
      console.log(response.data.reset_key, "forgotpassword");
   sessionStorage.setItem("reset_key",resetkey);
   message.success('OTP has been resent successfully!');
  if(response.data.status===1){
  
      navigate('/verifyotp');
  }
    });
  };
  return (
    <div className={classes.loginbg}> 
     <div className={`row d-flex bg-light justify-content-center rounded-5 p-3 ${classes.container}`}>
   
            <h3 className='text-center'>Forgot Password<hr /></h3>
         
            <div className={`col p-3 ${classes.container2}`}>
              <img style={{width:'100vh',height:'70vh'}}
                src={loginimage}
                alt="YourImage"
                className="img-fluid  "
              />
            </div>

            <div   className={` col bg-light  mt-5  rounded-3 p-4 ${classes.container3}`}>
           
              <h2 className="text-center">Email<hr /></h2>
           
              <form  onSubmit={formik.handleSubmit}>
                <TextInputBox
                title={"Enter Registered Email"}
                  value={formik.values.email}
                  onchange={formik.handleChange("email")}
                  placeholder="Enter email"
                  errorText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                />
                <Button
                  variant="primary"
                  type="submit"
                  className=" mt-3"
                >
                  Submit
                </Button>
              </form>
           
          </div>
        </div>
      </div>

  );
}
