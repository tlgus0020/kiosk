import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddMenuModal from '../util/AddMenuModal';
import '../css/Pay.css'; 

export const Head_menu = () => {
  const [menus, setMenus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(10); 
  const REST = process.env.REACT_APP_REST;

  useEffect(() => {
    fetchMenus();
  }, []);
  
  const fetchMenus = () => {
    axios.get(`${REST}/admin/menulist`)
      .then(res => setMenus(res.data))
      .catch(err => console.error('메뉴 불러오기 실패:', err));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMenus = menus.slice(indexOfFirstItem, indexOfLastItem); 
  const totalPages = Math.ceil(menus.length / itemsPerPage); 

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pay-container">
      <input type="button" value="메뉴추가" onClick={() => setShowModal(true)} />
      
      {showModal && <AddMenuModal onClose={() => setShowModal(false)} onComplete={fetchMenus} />}

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
          {currentMenus.map(menu => (
            <tr key={menu.id}>
              <td>{menu.id}</td>
              <td>{menu.name}</td>
              <td>{menu.code}</td>
              <td>{menu.img}</td>
              <td>
                <input
                  type="checkbox"
                  checked={menu.state}
                  onChange={async () => {
                    const newState = menu.state ? 0 : 1;
                    try {
                      await axios.put(`${REST}/admin/menu/state/${menu.id}`, { state: newState });
                      setTimeout(() => {
                        fetchMenus();
                      }, 200);
                    } catch (err) {
                      console.error('상태 변경 실패:', err);
                    }
                  }}
                />
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </button>
        <span> {currentPage} / {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
};
