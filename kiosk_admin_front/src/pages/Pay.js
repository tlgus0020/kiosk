import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Pay.css';
import DateFilter from '../DateFilter';

const Pay = () => {
  const [payList, setPayList] = useState([]);
  const REST = process.env.REACT_APP_REST;
  const navigate = useNavigate();
  const [showDateFilter, setShowDateFilter] = useState(false);  
  const [searchTerm, setSearchTerm] = useState('');
  const handleDataSubmit = (filteredData) => {
    setPayList(filteredData);  
    setShowDateFilter(false); 
  };

  useEffect(() => {
    fetch(`${REST}/api/pay/list`)
      .then((res) => res.json())
      .then((data) => {
        console.log('결제 목록:', data);
        setPayList(data);
      })
      .catch((err) => {
        console.error('결제 리스트 불러오기 실패:', err);
      });
  }, []);

  const filterPayList = payList.filter((item) => {
    return item.size.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="pay-container">
      <button onClick={() => setShowDateFilter(true)}>DATE</button>

      <input 
        type="text" 
        placeholder="메뉴명을 입력해주세요." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="search-input" 
      />

      {/* DateFilter 모달 */}
      {showDateFilter && (
        <>
          <div className="overlay" onClick={() => setShowDateFilter(false)}></div>          
          <div className="modal">
            <DateFilter onSubmit={handleDataSubmit} setShowDateFilter={setShowDateFilter} />
          </div>
        </>
      )}

      {/* 결제 내역 테이블 */}
      <table className="pay-table">
        <thead>
          <tr>
            <th>NO</th>
            <th>결제수단</th>
            <th>결제내역</th>
            <th>결제금액</th>
            <th>결제일</th>
            <th>결제지점</th>
            <th>결제일련번호</th>
          </tr>
        </thead>
        <tbody>
          {filterPayList.map((item, index) => (
            <tr key={item.id} onClick={() => navigate(`/pay/${item.id}`)}>
              <td>{index + 1}</td>
              <td>{item.pay_method}</td>
              <td>{item.size}</td>
              <td>{item.price.toLocaleString()}</td>
              <td>{item.pay_date}</td>
              <td>{item.pay_place}</td>
              <td>{item.pay_num}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pay;
