import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import loginimage from '../../assests/4957136.jpg';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';

import { signin } from '../../axios/Service';
import { useDispatch } from 'react-redux';
import { handleStorage } from '../../redux/reducers/Logintoken';

function Login() {
    const navigate = useNavigate();
    const sha1 = require('sha1');
    const dispatch = useDispatch();
    const handleSubmitlogin=(values)=>{
      const finalData={
      userName:values.userName,
      password:values.password,
      }
      return finalData;
    }

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .matches(/^[a-zA-Z]{1,12}$/, 'Username is invalid')
                .required('Username is required'),
            password: Yup.string()
                .matches(/^[a-zA-Z0-9$]{1,12}$/, 'Password is invalid')
                .required('Password is required'),
        }),
        
        onSubmit: (values) => {
            let formdata = new FormData();
            formdata.append('userName', values.userName);
            formdata.append('password', values.password);
            formdata.append('device_type', '3');
            formdata.append('authcode', sha1('lkjfjIHJL@fdj385!jhg' + values.userName));

            signin(formdata)
                .then((response) => {
                    localStorage.setItem('username', JSON.stringify(response.data.token));
                    dispatch(handleStorage(response.data.token));
                    console.log(response.data.token);
                    console.log('verified');
                    navigate('/dashboard/listdashboard');
                })
                .catch((error) => {
                    console.log('error');
                });
        },
    });

    return (
        <div className={classes.loginbg}>
            <div className={`container bg-white rounded-5 p-5 ${classes.container}`}>
                <div className="row">
                    <div className="col-12 text-center">
                        <h3><strong>Welcome!!</strong><hr /></h3>
                    </div>
                    <div className={`col-lg-6 col-md-12 d-flex align-items-center justify-content-center ${classes.container2}`}>
                        <img src={loginimage} alt="YourImage" className="img-fluid rounded-5" />
                    </div>

                    <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center">
                        <div className={`bg-light p-5  rounded-5 ${classes.container3}`}>
                            <h2 className="text-center">Login<hr /></h2>
                            <form className="text-center" onSubmit={formik.handleSubmit}>
                                <input
                                    type="text"
                                    name="userName"
                                    placeholder="Username"
                                    required
                                    onBlur={formik.handleBlur}
                                    className="form-control"
                                    value={formik.values.userName}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.userName && formik.touched.userName ? (
                                    <p style={{ color: 'red',position:'relative', marginRight:'120px' }}>{formik.errors.userName}</p>
                                ) : null}
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    className="form-control my-2"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.password && formik.touched.password ? (
                                    <p style={{ color: 'red', margin: '0' }}>{formik.errors.password}</p>
                                ) : null}
                                <input
                                    type="submit"
                                    value="Signin"
                                    className="btn btn-success rounded "
                                />
                                <div className="form-check text-start ">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Remember me
                                    </label>
                                </div>
                                <p onClick={()=>{navigate('/forgotpassword')}} className="text-warning text-start d-block">Forgot Password?</p>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
