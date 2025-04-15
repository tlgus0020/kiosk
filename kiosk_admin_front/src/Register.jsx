import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const [userid, setUserid] = useState('');
  const [userpwd, setUserpwd] = useState('');
  const [email, setEmail] = useState('');
  const [placeid, setPlaceid] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const REST = process.env.REACT_APP_REST; 


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!placeid || !role) {
      alert("지점과 역할을 모두 선택해주세요.");
      return;
    }

    try {
      const res = await axios.post(`${REST}/login/register`, {
        userid,
        userpwd,
        placeid,
        role
      });

      alert("회원가입 성공!");
      navigate("/login");
    } catch (err) {
      console.error("회원가입 오류:", err.response?.data || err.message);
      alert("회원가입 실패: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>아이디</label>
          <input type="text" value={userid} onChange={e => setUserid(e.target.value)} required />
        </div>

        <div className="input-group">
          <label>비밀번호</label>
          <input type="password" value={userpwd} onChange={e => setUserpwd(e.target.value)} required />
        </div>

        <div className="input-group">
          <label>지점</label>
          <select value={placeid} onChange={e => setPlaceid(e.target.value)} required>
            <option value="">-- 지점 선택 --</option>
            <option value="1">강서</option>
            <option value="2">상봉</option>
            <option value="3">하남</option>
          </select>
        </div>

        <div className="input-group">
          <label>역할</label>
          <select value={role} onChange={e => setRole(e.target.value)} required>
            <option value="">-- 역할 선택 --</option>
            <option value="admin">admin</option>
            <option value="placeadmin">placeadmin</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">회원가입</button>
      </form>
    </div>
  );
}
