import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Pay.css';
import OrderModal from '../util/orderModal';

  const Stock = () => {
  const [stockList, setStockTotalList] = useState([]);
  const REST = process.env.REACT_APP_REST;
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios.get(`${REST}/api/stocktotalList`)
      .then(response => {
        setStockTotalList(response.data);
        console.log(response.data);
        
      })
      .catch(error => {
        console.error('재고 목록을 불러오는 데 실패했습니다:', error);
      });
  }, []);

  return (
    <div className="pay-container">
      <table className="pay-table">
        
          <thead>
            <tr>
              <th>NO</th>
              <th>지점</th>
              <th>메뉴명</th>
              <th>이미지파일주소</th>
              <th>재고량</th>
              <th>상품상태</th>
              <th>발주상태</th>
              <th>발주하기</th>
            </tr>
          </thead>
          <tbody>
            {stockList.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.place_name}</td>
                <td>{item.menu_name}</td>
                <td>{item.img_path}</td>
                <td>{item.stock_qty}</td>
                <td>{item.product_state ? '판매중' : '판매중단'}</td>
                {console.log('order_state:', item.order_state)}

                <td id="orderState">
                {item.order_state == null ? null : (
                  Number(item.order_state) === 0 ? (
                    <span className="badge badge-waiting">
                      <span className="dot orange" /> 발주됨
                    </span>
                  ) : Number(item.order_state) === 1 ? (
                    <span className="badge badge-progress">
                      <span className="dot purple" /> 배송중
                    </span>
                  ) : Number(item.order_state) === 2 ? (
                    <span className="badge badge-success">
                      <span className="dot green" /> 확인중
                    </span>
                  ) : (
                    <span className="badge badge-unknown">
                      <span className="dot gray" /> 알 수 없음
                    </span>
                  )
                )}
              </td>


                <td>
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setShowOrderModal(true);
                    }}
                  >
                    <img src="/Icon.png" alt="발주" />
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        
      </table>

      {/* 모달 렌더링 */}
      {showOrderModal && selectedItem && (
        <OrderModal
          item={selectedItem}
          onClose={() => setShowOrderModal(false)}
          onConfirm={() => {
            alert(`${selectedItem.menu_name} 발주 완료!`);
            setShowOrderModal(false);
          }}
          onQtyChange={(newQty) => {
            setSelectedItem(prev => ({
              ...prev,
              stock_qty: newQty,
            }));
          }}
        />
      )}
    </div>
  );
};

export default Stock;
