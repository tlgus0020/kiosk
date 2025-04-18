import React, { useState } from 'react';
import axios from 'axios';
import styles from '../src/css/login.module.css'
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

const REST = process.env.REACT_APP_REST;

function Login({ onLoginSuccess,checkAdmin }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("로봇 검증을 완료해주세요.");
      return;
    }
    doLogin();
  };
  
  function doLogin() {
    axios({
      method: 'POST',
      url: `${REST}/api/login`,
      data: {
        userid: userId,
        userpwd: password,
        captchaToken: captchaToken   // ← 추가됨
      }
    })
    .then((res) => {
      console.log('로그인 성공');
      const role = res.data.role;
      onLoginSuccess(role);
    })
    .catch((err) => {
      console.error('로그인 실패:', err);
    });
  }
  

  
  return (
    <div className={styles.loginbody}>
      <div className={styles.Logincontainer}>
        <h2>관리자페이지</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder='id'
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
          </div>

          <ReCAPTCHA
            sitekey="6Le9bRwrAAAAAFVOExLQhQPPE8U_0iDsI9s3EyD7" 
            onChange={(value) => {
              console.log("Captcha value:", value);
              setCaptchaToken(value);
            }}
          />

          <button type="submit">로그인</button>
          <button onClick={() => navigate("/register")}>
        회원가입
      </button>
        </form>
      </div>
    </div>  
  );
}

export default Login;
