import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddMenuModal from '../util/AddMenuModal';
import '../css/Pay.css'; 

export const Head_menu = () => {
  const [menus, setMenus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const REST = process.env.REACT_APP_REST;

  useEffect(() => {
    axios.get(`${REST}/admin/menulist`)
      .then(res => setMenus(res.data))
      .catch(err => console.error('메뉴 불러오기 실패:', err));
  }, []);

  return (
    <div className="pay-container">
      <input type="button" value="메뉴추가" onClick={() => setShowModal(true)} />
      
      {showModal && <AddMenuModal onClose={() => setShowModal(false)} />}

      <table className="pay-table">
        <thead>
          <tr>
            <th>NO</th>
            <th>메뉴명</th>
            <th>메뉴코드</th>
            <th>메뉴이미지경로</th>
            <th>판매상태</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {menus.map(menu => (
            <tr key={menu.id}>
              <td>{menu.id}</td>
              <td>{menu.name}</td>
              <td>{menu.code}</td>
              <td>{menu.img}</td>
              <td>{menu.state ? '활성' : '비활성'}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
