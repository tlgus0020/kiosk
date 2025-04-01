import React, { useState } from 'react';
import axios from 'axios';

const REST = process.env.REACT_APP_REST;

function Login({ onLoginSuccess }) {
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
        userpwd : password
      }
    })
    .then((res) => {
      console.log('로그인 성공');
      onLoginSuccess();
    })
    .catch((err) => {
      console.error('로그인 실패:', err);
    });
    
  }
  
  ;
  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
