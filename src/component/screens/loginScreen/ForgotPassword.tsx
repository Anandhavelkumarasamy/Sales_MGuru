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
import { forgotpasswordprops } from '../../../@types/forgotpassword';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required')
  });

  const {values,errors,touched,handleChange,handleSubmit} = useFormik<forgotpasswordprops>({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: (values) => handleForgotpassword(values),
  });

  const handleForgotpassword = (values: forgotpasswordprops) => {
    const formdata = new FormData();
    formdata.append('email', values.email);

    forgotpassword(formdata).then((response) => {
      const resetkey = response.data?.reset_key;
      console.log(response?.data?.reset_key, 'forgotpassword');
      sessionStorage.setItem('reset_key', resetkey);

      if (response?.data?.status === 1) {
        
        openSuccessMessage();  
        setTimeout(() => {
          navigate('/verifyotp');
        }, 2000); 
      
      }else{
        
          message.error(response.data.msg)
        
      }
    })
  };
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
      <div className={`row d-flex bg-light justify-content-center rounded-5 p-3 ${classes.container}`} >
        <h3 className="text-center">Forgot Password<hr /></h3>
        <div className={`col p-3 ${classes.container2}`} style={{height:'10px'}}>
          <img
            style={{ width: '100%', height: '35vh' }}
            src={loginimage}
            alt="YourImage"
            className="img-fluid"
          />
        </div>
        <div className={`col bg-white mt-3 rounded-3 p-4 ${classes.container3}`}>
          <h2 className="text-center">Email<hr /></h2>
          <form onSubmit={handleSubmit}>
            <TextInputBox
              title="Enter Registered Email"
              value={values.email}
              onchange={handleChange("email")}
              placeholder="Enter email"
              errorText={touched.email && errors.email ? errors.email : null}
            />
            <Button
              variant="primary"
              type="submit"
              className="mt-3"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
