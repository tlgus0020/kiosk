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
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterPlaces, setFilterPlaces] = useState([]);
  const [placeNames, setPlaceNames] = useState([]);

  const handleDataSubmit = (filteredData, sortOrder) => {
    setSortOrder(sortOrder);
    setPayList(filteredData);
    setShowDateFilter(false);
  };

  // 결제 내역 불러오기
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

  // 지점 목록 불러오기
  useEffect(() => {
    fetch(`${REST}/api/place/getnames`)
      .then((res) => res.json())
      .then((data) => {
        console.log('지점 목록:', data);
        setPlaceNames(data);
      })
      .catch((err) => console.error('지점 목록 가져오기 실패:', err));
  }, []);

  // 필터링
  const filterPayList = payList
    .filter((item) => item.size.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((item) => {
      if (filterPlaces.length > 0) {
        return filterPlaces.includes(item.pay_place);
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.pay_date);
      const dateB = new Date(b.pay_date);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const handlePlaceFilter = (place) => {
    setFilterPlaces((prev) =>
      prev.includes(place) ? prev.filter((p) => p !== place) : [...prev, place]
    );
  };

  return (
    <div className="pay-container">
      {/* ✅ DateFilter 모달 */}
      {showDateFilter && (
        <>
          <div className="overlay" onClick={() => setShowDateFilter(false)}></div>
            <DateFilter onSubmit={handleDataSubmit} setShowDateFilter={setShowDateFilter} />
        </>
      )}

      {/* ✅ 필터 영역 */}
      <div className="pay-filters">
        <button className="date-btn" onClick={() => setShowDateFilter(true)}>DATE</button>

        <input
          type="text"
          placeholder="메뉴명을 입력해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {placeNames.map((placeName) => (
          <button
            key={placeName}
            className={`place-btn ${filterPlaces.includes(placeName) ? 'selected' : ''}`}
            onClick={() => handlePlaceFilter(placeName)}
          >
            {placeName}
          </button>
        ))}
      </div>

      {/* ✅ 테이블 */}
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
