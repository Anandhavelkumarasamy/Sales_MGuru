import React from 'react';
import TextInputBox from '../../../Components/userManagementModals/TextInputBox';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import { changepassword } from '../../axios/Service';
import { useNavigate } from 'react-router-dom';
import loginimage from '../../assests/4957136.jpg';
import classes from './Login.module.css'; 
import { message } from 'antd';

export default function ChangePassword() {
  const navigate = useNavigate();
  
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  const handleupdatepassword = (values) => {
    let formdata = new FormData();
   let resetKey= sessionStorage.getItem('resetkey');
   console.log(resetKey,"secondkey")

    formdata.append("resetKey", resetKey);
    formdata.append("newPassword", values.password);
    
    changepassword(formdata)
      .then((response) => {
        console.log(response, "updated successfully");
        openSuccessMessage();  
        setTimeout(() => {
          navigate('/login');
        }, 2000); 
      })
      .catch((error) => {
        console.error("Failed to update password:", error);
        messageApi.error('Password update failed.');
      });
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .matches(/^[a-zA-Z0-9$]+$/, "Password is invalid")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const { values, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleupdatepassword(values);
    },
  });

  const openSuccessMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Updating password...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Password updated successfully!',
        duration: 2,
      });
    }, 1000); 
  };

  return (
    <div className={classes.loginbg}> 
      {contextHolder} {/* Ensure message context is rendered */}
      <div className={`container bg-white rounded-5 p-5 ${classes.container}`}>
        <div className="row">
          <div className="col-12 text-center">
            <h3><strong>Update Password</strong><hr /></h3>
          </div>

          <div className={`col-lg-6 col-md-12 d-flex align-items-center justify-content-center ${classes.container2}`}>
            <img src={loginimage} alt="Change Password" className="img-fluid rounded-5" />
          </div>

          <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center">
            <div className="bg-light p-4 w-100 rounded-5">
              <h2 className="text-center "> New Password<hr /></h2>
              
              <TextInputBox
                title="Password"
                type="password"
                value={values.password}
                onchange={handleChange("password")}
                placeholder="Enter new password"
                errorText={touched.password && errors.password ? errors.password : null}
                isPassword={true}
              />
              
              <TextInputBox
                title="Confirm Password"
                value={values.confirmPassword}
                onchange={handleChange("confirmPassword")}
                placeholder="Confirm new password"
                errorText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null}
                isPassword={true}
              />

              <Button
                variant="primary"
                onClick={handleSubmit}
                className="mt-4"
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
