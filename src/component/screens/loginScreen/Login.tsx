import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import loginimage from "../../assests/4957136.jpg";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

import { signin } from "../../axios/Service";
import { useDispatch } from "react-redux";
import { handleStorage } from "../../redux/reducers/Logintoken";
import TextInputBox from "../../../Components/userManagementModals/TextInputBox";
import { LoginProps } from "../../../@types/login";
import { Helmet } from "react-helmet";

function Login() {
  const navigate = useNavigate();
  const sha1 = require("sha1");
  const dispatch = useDispatch();

  const handleSubmitlogin = (values: LoginProps) => {
    const finalData = {
      userName: values.userName,
      password: values.password,
    };
    return finalData;
  };

  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      validationSchema: Yup.object({
        userName: Yup.string()
          .matches(/^[a-zA-Z]{1,12}$/, "Username is invalid")
          .required("Username is required"),
        password: Yup.string()
          .matches(/^[a-zA-Z0-9$]{1,12}$/, "Password is invalid")
          .required("Password is required"),
      }),

      onSubmit: (values) => {
        let formdata = new FormData();
        formdata.append("userName", values.userName);
        formdata.append("password", values.password);
        formdata.append("device_type", "3");
        formdata.append(
          "authcode",
          sha1("lkjfjIHJL@fdj385!jhg" + values.userName)
        );

        signin(formdata)
          .then((response) => {
            localStorage.setItem(
              "username",
              JSON.stringify(response.data.token)
            );
            sessionStorage.setItem("userId", response.data.userId);
            sessionStorage.setItem("userType", response.data.userType);
            dispatch(handleStorage(response.data.token));
            navigate("/dashboard/listdashboard");
          })
          .catch((error) => {
            console.log("error");
          });
      },
    });

  return (
    <>
      <Helmet>
        <title>Admin</title>
        <meta name="keywords" content="dashboard,dash,home" />
      </Helmet>

      <div className={classes.loginbg}>
        <div
          className={`row d-flex  bg-light justify-content-center rounded-5 p-3 ${classes.container}`}
        >
          <h2 className="text-center">
            Welcome!!
            <hr />
          </h2>
          <div className={`col p-3 ${classes.container2}`}>
            <img
              style={{ width: "100%", height: "45vh" }}
              src={loginimage}
              alt="Login"
              className="img-fluid"
            />
          </div>

          <div
            className={`col mt-3 bg-white rounded-3 p-3 ${classes.container3}`}
          >
            <h3 className="text-center">
              Login
              <hr />
            </h3>
            <form onSubmit={handleSubmit}>
              <TextInputBox
                title={"User Name"}
                value={values.userName}
                onchange={handleChange("userName")}
                placeholder="Enter username"
                onBlurs={handleBlur}
                errorText={
                  touched.userName && errors.userName ? errors.userName : null
                }
                isRequired={true}
              />
              <TextInputBox
                title={"Password"}
                value={values.password}
                onchange={handleChange("password")}
                placeholder="Enter Password"
                onBlurs={handleBlur}
                errorText={
                  touched.password && errors.password ? errors.password : null
                }
                isPassword={true}
                isRequired={true}
              />

              <div className={classes.signinbtn}>
                <div>
                  <input
                    type="submit"
                    value="Signin"
                    className="btn btn-success rounded"
                  />
                </div>
                <div>
                  <p
                    onClick={() => navigate("/forgotpassword")}
                    className="text-warning"
                  >
                    Forgot Password?
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
