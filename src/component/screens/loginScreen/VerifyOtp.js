import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Flex, Input, Typography } from 'antd';
import { Button } from 'react-bootstrap';
import { resendotp, verifyotp } from '../../axios/Service';
import { useNavigate } from 'react-router-dom';
import loginimage from '../../assests/4957136.jpg'; 
import classes from './Login.module.css'; 

const { Title } = Typography;

export default function VerifyOtp() { 
  const selector = useSelector((state) => state.authLogin);
  const navigate = useNavigate();
  
  const [texts, settexts] = useState('');
  const [timeLeft, setTimeLeft] = useState(20); // Initialize with 20 seconds
   

  const onChange = (text) => {
    console.log('onChange:', text);
    settexts(text);
  };

  const sharedProps = {
    onChange,
  };
  
  const handleresendotp = () => {
    let resetKey = sessionStorage.getItem("reset_key");
    let formdata = new FormData();
    formdata.append("resetKey", resetKey);
    resendotp(formdata).then((response) => {
      console.log(response);
     sessionStorage.setItem("reset_key",response.data.reset_key);
     setTimeLeft(20);
    });

  };
  
  const handleValue = () => {
    let formdata = new FormData();
    let resetKey = sessionStorage.getItem("reset_key"); 
    formdata.append("resetKey", resetKey);
    formdata.append("otp", texts);
    verifyotp(formdata).then((response) => {
      console.log("successfully logged in", response.data);
      sessionStorage.setItem('reset_key', response.data.reset_key);
      navigate('/changepassword');
    });
  };

 

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer); 
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className={classes.loginbg}>
      <div className={`container bg-white rounded-5 p-5 ${classes.container}`}>
        <div className="row">
          <div className="col-12 text-center">
            <h3><strong>Verify OTP</strong><hr /></h3>
          </div>

          <div className={`col-lg-6 col-md-12 d-flex align-items-center justify-content-center ${classes.container2}`}>
            <img src={loginimage} alt="Verify OTP" className="img-fluid rounded-5" />
          </div>

          <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center">
            <div className="bg-light p-5 w-100 rounded-5">
              <h2 className="text-center">Enter OTP<hr /></h2>
              <Flex gap="middle" align="flex-start" vertical>
                <Title level={5}>(Numbers only)</Title>
                <Input.OTP
                  formatter={(str) => str.replace(/\D/g, '')}  
                  {...sharedProps}
                />
                <p>
                  <Button
                    variant="primary"
                    onClick={handleValue}
                    className="float-start"
                  >
                    Submit
                  </Button>   
                  <Button 
                    disabled={timeLeft > 0}
                    onClick={handleresendotp}
                    className="float-end "
                  >
                    Resend OTP
                  </Button>
                </p>
                <p>Time remaining: {formatTime(timeLeft)}</p>
              </Flex>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
