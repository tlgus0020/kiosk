import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Login';
import { Register } from './Register'; // 🔥 회원가입 컴포넌트
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

// 🧠 Root 컴포넌트
function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isAdmin, setIsAdmin] = useState(true);       
  const navigate = useNavigate();

  useEffect(() => {
    console.log('isAdmin:', isAdmin);
  }, [isAdmin]);

  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setIsAdmin(role === 'admin');
    if (role === 'admin') {
      navigate('/head/stock');
    } else {
      navigate('/stock');
    }
  };

  // 로그인 전 → 라우팅 분기
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      </Routes>
    );
  }

  // 로그인 후
  return <App admin={isAdmin} />;
}

// 🟢 최상단에서 BrowserRouter로 감싸기
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);

reportWebVitals();
