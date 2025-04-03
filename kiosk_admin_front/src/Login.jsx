import React, { useState } from 'react';
import axios from 'axios';
import styles from '../src/css/login.module.css'

const REST = process.env.REACT_APP_REST;

function Login({ onLoginSuccess,checkAdmin }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    doLogin();
    
  }
  
  function doLogin(){
    console.log(userId);
    console.log(password);
    axios({
      method: 'POST',
      url: `${REST}/api/login`,
      data: {
        userid : userId,
        userpwd : password,
        
      }
    })
    .then((res) => {
      console.log('로그인 성공');
      const role = res.data.role;

      console.log('받은 role:', role);
      onLoginSuccess(role); 
    })
    .catch((err) => {
      console.error('로그인 실패:', err);
    });
    
  }
  
  ;
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
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>  
  );
}

export default Login;
