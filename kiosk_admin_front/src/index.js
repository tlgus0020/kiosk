import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Login';
import { useNavigate, BrowserRouter } from 'react-router-dom';

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
    if(role === 'admin'){
      navigate('/head/stock');
    } else {
      navigate('/stock');
    }
  };

  return isLoggedIn ? (
    <App admin={isAdmin} />
  ) : (
    <Login onLoginSuccess={handleLoginSuccess} />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);

reportWebVitals();
