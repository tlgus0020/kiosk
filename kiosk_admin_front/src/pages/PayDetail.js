import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const REST = process.env.REACT_APP_REST;

const PayDetail = () => {
  const { id } = useParams(); // URL에서 pay/(id) 가져오기
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    fetch(`${REST}/api/pay/detail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('결제 상세 내역:', data);
        setDetail(data);
      })
      .catch((err) => {
        console.error('상세 내역 불러오기 실패:', err);
      });
  }, [id]);

  if (!detail) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>결제 상세 내역</h1>
      <ul>
        <li><strong>ID:</strong> {detail.id}</li>
        <li><strong>주문번호:</strong> {detail.pay_num}</li>
        <li><strong>메뉴:</strong> {detail.size}</li>
        <li><strong>결제방법:</strong> {detail.pay_method}</li>
        <li><strong>가격:</strong> {detail.price.toLocaleString()}원</li>
        <li><strong>지점:</strong> {detail.pay_place}</li>
        <li><strong>결제일:</strong> {detail.pay_date.split('T')[0]}</li>
        <li><strong>맛 선택:</strong> {detail.flavor.join(', ')}</li>
      </ul>
    </div>
  );
};

export default PayDetail;
