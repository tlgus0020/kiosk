import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Pay.css';
import OrderModal from '../util/orderModal';

const Stock = () => {
  const [stockList, setStockList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [placeNames, setPlaceNames] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlaces, setFilterPlaces] = useState([]);
  const REST = process.env.REACT_APP_REST;

  useEffect(() => {
    axios.get(`${REST}/api/stocktotalList`)
      .then(res => {
        setStockList(res.data);
        setFilteredList(res.data);
        const uniquePlaces = [...new Set(res.data.map(item => item.place_name))];
        setPlaceNames(uniquePlaces);
      });
  }, []);

  // 필터 적용
  useEffect(() => {
    let list = [...stockList];
    if (searchTerm) {
      list = list.filter(item => item.menu_name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (filterPlaces.length > 0) {
      list = list.filter(item => filterPlaces.includes(item.place_name));
    }
    setFilteredList(list);
  }, [searchTerm, filterPlaces, stockList]);

  const handlePlaceFilter = (place) => {
    setFilterPlaces(prev =>
      prev.includes(place) ? prev.filter(p => p !== place) : [...prev, place]
    );
  };

  return (
    <div className="pay-container">
      {/* 필터 영역 */}
      <div className="pay-filters">
        <input
          type="text"
          placeholder="메뉴명을 입력해주세요"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {placeNames.map(place => (
          <button
            key={place}
            className={`place-btn ${filterPlaces.includes(place) ? 'selected' : ''}`}
            onClick={() => handlePlaceFilter(place)}
          >
            {place}
          </button>
        ))}
      </div>

      {/* 테이블 */}
      <table className="pay-table">
        <thead>
          <tr>
            <th>NO</th>
            <th>지점</th>
            <th>메뉴명</th>
            <th>이미지</th>
            <th>재고량</th>
            <th>상품상태</th>
            <th>발주상태</th>
            <th>발주하기</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((item, index) => (
            <tr key={`${item.menu_id}-${item.place_id}`}>
              <td>{index + 1}</td>
              <td>{item.place_name}</td>
              <td>{item.menu_name}</td>
              <td>{item.img_path}</td>
              <td>
                {item.stock_qty === 0 ? (
                  <span className="badge-outofstock"><span className="dot purple" /> 재고없음</span>
                ) : item.stock_qty}
              </td>
              <td>
                <span className={`badge ${item.product_state ? 'badge-stop' : 'badge-sale'}`}>
                  <span className={`dot ${item.product_state ? 'red' : 'purple'}`} />
                  {item.product_state ? '판매중단' : '판매중'}
                </span>
              </td>

              <td>
                {item.order_state == null ? null : (
                  Number(item.order_state) === 0 ? (
                    <span className="badge badge-waiting"><span className="dot orange" /> 발주됨</span>
                  ) : Number(item.order_state) === 1 ? (
                    <span className="badge badge-progress"><span className="dot purple" /> 배송중</span>
                  ) : Number(item.order_state) === 2 ? (
                    <span className="badge badge-success"><span className="dot green" /> 확인중</span>
                  ) : (
                    <span className="badge badge-unknown"><span className="dot gray" /> 알 수 없음</span>
                  )
                )}
              </td>
              <td>
                <button onClick={() => { setSelectedItem(item); setShowOrderModal(true); }}>
                  <img src="/Icon.png" alt="발주" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showOrderModal && selectedItem && (
        <OrderModal
          item={selectedItem}
          onClose={() => setShowOrderModal(false)}
          onConfirm={(qty) => {
            axios.post(`${REST}/api/order/request`, {
              menu_id: selectedItem.menu_id,
              place_id: selectedItem.place_id,
              amount: qty,
            }).then(() => {
              alert(`${selectedItem.menu_name} ${qty}개 발주 완료!`);
              setShowOrderModal(false);
            }).catch(err => {
              alert("발주 요청 중 오류 발생");
              console.error(err);
            });
          }}
        />
      )}
    </div>
  );
};

export default Stock;
