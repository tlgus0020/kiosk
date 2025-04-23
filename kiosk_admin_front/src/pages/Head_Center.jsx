import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateFilter from "../DateFilter";
import axios from "axios";
import "../css/Pay.css";

export function Head_Center(props) {
  const [payList, setPayList] = useState([]);
  const REST = process.env.REACT_APP_REST;
  const navigate = useNavigate();

  const [showDateFilter, setShowDateFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlaces, setFilterPlaces] = useState([]);
  const [placeNames, setPlaceNames] = useState([]);

  const handleDataSubmit = (filteredData) => {
    setPayList(filteredData);
    setShowDateFilter(false);
  };

  const handleChangeOrder = (idx, e) => {
    const stateValue = parseInt(e.target.value, 10);

    axios.post(`${REST}/admin/setStockState`, null, {
      params: {
        id: idx,
        state: stateValue,
      },
    })
      .then(res => {
        console.log("✅ 상태 변경 완료:", res.data);
        alert("상태 변경 성공!");
      })
      .catch(err => {
        console.error("❌ 상태 변경 실패:", err);
        alert("서버 오류로 상태 변경에 실패했습니다.");
      });
  };

  const handlePlaceFilter = (place) => {
    setFilterPlaces((prev) =>
      prev.includes(place) ? prev.filter((p) => p !== place) : [...prev, place]
    );
  };

  useEffect(() => {
    fetch(`${REST}/admin/GetStock`)
      .then((res) => res.json())
      .then((data) => {
        setPayList(data);
        const uniquePlaces = [...new Set(data.map(item => item.place_name))];
        setPlaceNames(uniquePlaces);
      })
      .catch((err) => {
        console.error("결제 리스트 불러오기 실패:", err);
      });
  }, []);

  // 필터링
  const filteredList = payList
    .filter(item => item.flavor_name?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(item => filterPlaces.length === 0 || filterPlaces.includes(item.place_name));

  return (
    <div className="admin-pay-container">
     
      {showDateFilter && (
        <>
          <div className="admin-overlay" onClick={() => setShowDateFilter(false)}></div>
          <div className="admin-modal">
            <DateFilter onSubmit={handleDataSubmit} />
          </div>
        </>
      )}

      {/* 필터 영역 */}
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

      <table className="admin-pay-table">
        <thead>
          <tr>
            <th>NO</th>
            <th>재고량</th>
            <th>메뉴이름</th>
            <th>지점명</th>
            <th>판매상태</th>
            <th>발주상태</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.amount}</td>
              <td>{item.flavor_name}</td>
              <td>{item.place_name}</td>
              <td>
                <span className={`badge ${item.selling ? 'badge-stop' : 'badge-sale'}`}>
                  <span className={`dot ${item.selling ? 'red' : 'purple'}`} />
                  {item.selling ? '판매중단' : '판매중'}
                </span>
              </td>
              <td>
                {item.inOrder === -1 ? null : (
                  <select onChange={(e) => handleChangeOrder(item.out_id, e)} defaultValue={item.inOrder}>
                    <option value={0}>발주됨</option>
                    <option value={1}>배송중</option>
                    <option value={2}>확인중</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
