import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Pay.css';

const Pay = () => {
  const [payList, setPayList] = useState([]);
  const REST = process.env.REACT_APP_REST;
  const navigate = useNavigate();

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

  return (
    <div className="pay-container">
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
          {payList.map((item, index) => (
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
