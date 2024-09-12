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
      {contextHolder}
      <div className={`row d-flex bg-light justify-content-center rounded-5 p-3 ${classes.container}`}>
       
            <h3 className='text-center'>Update Password<hr /></h3>
     
            <div className={`col p-3 ${classes.container2}`}>
              <img style={{width:'100vh',height:'70vh'}}
                src={loginimage}
                alt="YourImage"
                className="img-fluid  "
              />
            </div>

            <div   className={` col bg-white  mt-5  rounded-3 p-4 ${classes.container3}`}>
           
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
  );
}
