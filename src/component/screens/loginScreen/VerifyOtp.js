import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Input, Typography } from 'antd';
import { Button } from 'react-bootstrap';
import { verifyotp } from '../../axios/Service';
import { handleresetkey } from '../../redux/reducers/Logintoken';
import { useNavigate } from 'react-router-dom';
import loginimage from '../../assests/4957136.jpg'; // Reuse the background image
import classes from './Login.module.css'; // Reuse the CSS from the Login component

const { Title } = Typography;

export default function VerifyOtp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [texts, settexts] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  
  const onChange = (text) => {
    console.log('onChange:', text);
    settexts(text);
  };

  const sharedProps = {
    onChange,
  };

  const selector = useSelector((state) => state.authLogin);
  console.log(selector.resetkey); 

  const handleValue = () => {
    let formdata = new FormData();
    const resetKey=sessionStorage.getItem("resetkey")
    console.log(resetKey,"sessionstorage");
    formdata.append("resetKey", resetKey);
    formdata.append("otp", texts);
    
    verifyotp(formdata).then((response) => {
      console.log("successfully logged in", response.data);
      
      sessionStorage.setItem('resetkey', response.data.reset_key);

      navigate('/changepassword');
    });
  };
  if (timeLeft === 0) {
   
    alert("Time's up! Please request a new OTP.");
    navigate('/forgotpassword'); 
    
  }

  
   setTimeout(() => {
    setTimeLeft(timeLeft - 1);
  }, 1000);
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
                <Button
                  variant="primary"
                  onClick={handleValue}
                  className="float-end me-5 mt-2"
                >
                  Submit
                </Button>
                <p>Time remaining: {formatTime(timeLeft)}</p>
              </Flex>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
