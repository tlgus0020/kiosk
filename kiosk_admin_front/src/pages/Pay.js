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
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterPlaces, setFilterPlaces] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const handleDataSubmit = (filteredData , sortOrder) => {
    setSortOrder(sortOrder);
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

  const filterPayList = payList
  .filter((item) => {
    return item.size.toLowerCase().includes(searchTerm.toLowerCase());
  })
  .filter((item) => {
    if (filterPlaces.length > 0) {
      return filterPlaces.includes(item.pay_place)
    }
    return true; 
  })
  .sort((a, b) => {
    const dateA = new Date(a.pay_date);
    const dateB = new Date(b.pay_date);

    if (sortOrder === "desc") {
      return dateB - dateA;
    } else {
      return dateA - dateB;  
    }
  });

  const handlePlaceFilter = (place) => {
    setFilterPlaces((prevFilterPlaces) => {
      if (prevFilterPlaces.includes(place)) {
        return prevFilterPlaces.filter((p) => p !== place); 
      } else {
        return [...prevFilterPlaces, place]; 
      }
    });
  };

  const handleButtonClick = (e) => {

    const ele = document.querySelectorAll(".place-btn");
    ele.forEach(element => {
      element.classList.remove("selected");
    });
    e.target.classList.add("selected");

    setIsClicked(!isClicked);
  };

  return (
    <div className="pay-container">
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
            <th>
            <button className="date-btn" onClick={() => setShowDateFilter(true)}>DATE</button>
            </th>
            <th>
              <input 
                type="text" 
                placeholder="메뉴명을 입력해주세요." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="search-input" 
              />
            </th>
            <th><button className="place-btn" onClick={(e) =>{ handlePlaceFilter('강서지점'); handleButtonClick(e);}}>강서지점</button></th>
            <th><button className="place-btn" onClick={(e) =>{ handlePlaceFilter('상봉지점'); handleButtonClick(e);}}>상봉지점</button></th>
            <th><button className="place-btn" onClick={(e) =>{ handlePlaceFilter('하남지점'); handleButtonClick(e);}}>하남지점</button></th>
          </tr>
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
