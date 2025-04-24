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
  const [sortState, setSortState] = useState("null")
  const [sortToggle,setSortToggle] = useState(false);
  const [reRender, setReRender] = useState(false);
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

  useEffect(()=>{
    setFilteredList(payList
      .filter(item => item.flavor_name?.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(item => filterPlaces.length === 0 || filterPlaces.includes(item.place_name))) 
  },[filterPlaces])

  useEffect(() => {
    fetch(`${REST}/admin/GetStock`)
      .then((res) => res.json())
      .then((data) => {
        setPayList(data);
        const uniquePlaces = [...new Set(data.map(item => item.place_name))];
        setPlaceNames(uniquePlaces);
        setFilterPlaces([]);
      })
      .catch((err) => {
        console.error("결제 리스트 불러오기 실패:", err);
      });
  }, []);


  useEffect(()=>{
    setFilteredList(payList
      .filter(item => item.flavor_name?.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(item => filterPlaces.length === 0 || filterPlaces.includes(item.place_name)))
  },payList)
  // 필터링
  const [filteredList,setFilteredList] = useState([])
  function doSort(type,e) {
    document.querySelectorAll("#menuname").forEach(element => {
      // 요소의 텍스트에서 ▽ 문자를 제거
      element.textContent = element.textContent.replace("▽", "");
      element.textContent = element.textContent.replace("△", "");
    });
    if(type !== sortState && sortState !== null){
      console.log('eh');
      setFilteredList(payList
        .filter(item => item.flavor_name?.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(item => filterPlaces.length === 0 || filterPlaces.includes(item.place_name)))
      setSortToggle(false);
      setSortState(null);
      return;
    }
    let sorted;
  
    if (!sortToggle) {
      // 내림차순 정렬
      sorted = filteredList.slice().sort((a, b) => {
        if (type === "place_name") {
          return b.place_name.localeCompare(a.place_name);  // 내림차순
        } else if (type === "flavor_name") {
          return b.flavor_name.localeCompare(a.flavor_name);  // 내림차순
        } else if (type === "amount") {
          return b.amount - a.amount;  // 내림차순 (숫자 비교)
        } else if (type === "selling") {
          return b.selling - a.selling;  // 내림차순 (false < true)
        } else if (type === "inOrder") {
          return b.inOrder - a.inOrder;  // 내림차순 (숫자 비교)
        } else {
          return 0; // 기본적으로 정렬 안 함
        }
      });
    } else {
      // 오름차순 정렬
      sorted = filteredList.slice().sort((a, b) => {
        if (type === "place_name") {
          return a.place_name.localeCompare(b.place_name);  // 오름차순
        } else if (type === "flavor_name") {
          return a.flavor_name.localeCompare(b.flavor_name);  // 오름차순
        } else if (type === "amount") {
          return a.amount - b.amount;  // 오름차순 (숫자 비교)
        } else if (type === "selling") {
          return a.selling - b.selling;  // 오름차순 (false < true)
        } else if (type === "inOrder") {
          return a.inOrder - b.inOrder;  // 오름차순 (숫자 비교)
        } else {
          return 0; // 기본적으로 정렬 안 함
        }
      });
    }

    if(sortToggle){
      e.target.innerHTML += "▽"
    }
    else{
      e.target.innerHTML += "△"

    }
    // 새 참조 배열 만들어서 강제로 리렌더링 유도
    setFilteredList(sorted.map(item => ({ ...item })));
    setSortState(type);
    setSortToggle(!sortToggle);  // 오름차순/내림차순 토글
    setReRender(!reRender);      // 리렌더링을 유도
  }
  
  
  useEffect(()=>{
    console.log(filteredList);
  },[filteredList])
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
            <th onClick={(e)=> doSort('amount',e)} id="menuname">재고량</th>
            <th onClick={(e)=> doSort('flavor_name',e)} id="menuname">메뉴이름</th>
            <th onClick={(e)=> doSort('place_name',e)} id="menuname">지점명</th>
            <th onClick={(e)=> doSort('selling',e)} id="menuname">판매상태</th>
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
      {reRender? null:null}
    </div>
  );
}
