import React from 'react';
import TextInputBox from '../../../Components/userManagementModals/TextInputBox';
import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { forgotpassword } from '../../axios/Service';
import { useNavigate } from 'react-router-dom';
import loginimage from '../../assests/4957136.jpg';
import classes from './Login.module.css'; 

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
      navigate('/verifyotp');
    });
  };
  return (
    <div className={classes.loginbg}> 
      <div className={`container bg-white rounded-5 p-5 ${classes.container}`}>
        <div className="row">
          <div className="col-12 text-center">
            <h3><strong>Forgot Password</strong><hr /></h3>
          </div>

          <div className={`col-lg-6 col-md-12 d-flex align-items-center justify-content-center ${classes.container2}`}>
            <img src={loginimage} alt='img' className="img-fluid rounded-5" />
          </div>

          <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center">
            <div className="bg-light p-5 w-100 rounded-5">
              <h2 className="text-center">Email<hr /></h2>
              <br></br>
              <form className="text-center" onSubmit={formik.handleSubmit}>
                <TextInputBox
                  
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
      </div>
    </div>
  );
}
