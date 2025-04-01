import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: '2rem' }}>
      <h1>결제 내역 페이지</h1>
      <ul>
        {payList.map((item) => (
          <li key={item.id} onClick={() => navigate(`/pay/${item.id}`)}>
            <strong> 아이디:</strong> {item.id} |
            <strong> 주문번호:</strong> {item.pay_num} |
            <strong> 메뉴:</strong> {item.size} |
            <strong> 결제방법:</strong> {item.pay_method} |
            <strong> 가격:</strong> {item.price.toLocaleString()}원 |
            <strong> 지점:</strong> {item.pay_place} |
            <strong> 날짜:</strong> {item.pay_date.split('T')[0]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pay;
