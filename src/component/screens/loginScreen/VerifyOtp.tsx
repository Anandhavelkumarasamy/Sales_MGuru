import React, { useState, useEffect } from "react";

import { Flex, Input, Typography } from "antd";
import { Button } from "react-bootstrap";
import { resendotp, verifyotp } from "../../axios/Service";
import { useNavigate } from "react-router-dom";
import loginimage from "../../assests/4957136.jpg";
import classes from "./Login.module.css";
import { message } from "antd";
import { Helmet } from "react-helmet";

const { Title } = Typography;

export default function VerifyOtp() {
  const navigate = useNavigate();

  const [texts, settexts] = useState("");
  const [timeLeft, setTimeLeft] = useState(20);

  const onChange = (text: string) => {
    console.log("onChange:", text);
    settexts(text);
  };

  const sharedProps = {
    onChange,
  };

  const handleresendotp = () => {
    let resetKey = sessionStorage.getItem("reset_key");
    let formdata = new FormData();
    formdata.append("resetKey", resetKey || "");
    resendotp(formdata).then((response) => {
      console.log(response);
      sessionStorage.setItem("reset_key", response.data.reset_key);
      message.success("resend otp has been sent successfully ");
      setTimeLeft(20);
    });
  };

  const handleValue = () => {
    let formdata = new FormData();
    let resetKey = sessionStorage.getItem("reset_key");
    formdata.append("resetKey", resetKey || "");
    formdata.append("otp", texts);
    if (texts) {
      verifyotp(formdata).then((response) => {
        console.log("successfully logged in", response.data);
        sessionStorage.setItem("resetkey", response.data.reset_key);

        if (response.data.status === 1) {
          message.success("OTP has been verified successfully!");
          navigate("/changepassword");
        } else {
          message.error(response.data.msg);
        }
      });
    }
  };
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      <div>
        <Helmet>
          <title>VerifyOtp</title>
          <meta name="keywords" content="dashboard,dash,home" />
          {/* <h1>Welcome to My React Website</h1> */}
        </Helmet>
      </div>
      <div className={classes.loginbg}>
        <div
          className={`row d-flex bg-light  justify-content-center rounded-5 p-3 ${classes.container}`}
        >
          <h3 className="text-center">
            Verify OTP
            <hr />
          </h3>

          <div className={`col p-3 ${classes.container2}`}>
            <img
              style={{ width: "100%", height: "38vh" }}
              src={loginimage}
              alt="YourImage"
              className="img-fluid  "
            />
          </div>

          <div
            className={` col bg-white mt-3    rounded-3 p-4 ${classes.container3}`}
          >
            <h2 className="text-center">
              Enter OTP
              <hr />
            </h2>

            <Flex gap="middle" align="flex-start" vertical>
              <Title level={5}>(Numbers only)</Title>
              <Input.OTP
                formatter={(str) => str.replace(/\D/g, "")}
                {...sharedProps}
              />

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignSelf: "center",
                  marginTop: "10px",
                }}
              >
                <div className="text-start">
                  {" "}
                  <Button
                    variant="primary"
                    onClick={handleValue}
                    className="float-start"
                  >
                    Submit
                  </Button>{" "}
                </div>
                <div>
                  {" "}
                  <Button
                    disabled={timeLeft > 0}
                    onClick={handleresendotp}
                    className="float-end"
                  >
                    Resend OTP
                  </Button>
                </div>
              </div>

              <p>Time remaining: {formatTime(timeLeft)}</p>
            </Flex>
          </div>
        </div>
      </div>
    </>
  );
}
