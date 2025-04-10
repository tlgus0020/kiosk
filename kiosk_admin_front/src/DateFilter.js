import React, { useState, useEffect } from "react";
import Calendar from "react-calendar"; 
import './css/DateFilter.css';

const DateFilter = ({ onSubmit, onSortChange, setShowDateFilter }) => {
  const REST = process.env.REACT_APP_REST;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [calendarType, setCalendarType] = useState(""); 
  const [showSortDropdown, setShowSortDropdown] = useState(false); 

  const handleStartDateChange = (date) => {
    const localDate = new Date(date);
    setStartDate(localDate.toLocaleDateString("en-CA"));
    console.log("Start Date changed:", localDate.toLocaleDateString("en-CA")); 
    setCalendarType(""); 
  };

  const handleEndDateChange = (date) => {
    if (!startDate) {
      alert("먼저 시작 날짜를 선택해주세요.");
      return;
    }
    const localDate = new Date(date); 
    setEndDate(localDate.toLocaleDateString("en-CA"));
    console.log("End Date changed:", localDate.toLocaleDateString("en-CA")); 
    setCalendarType(""); 
  };

  const handleapply = async (e) => {
    e.preventDefault();
    console.log("선택날짜:"+startDate+"~"+endDate+",정렬방식:"+sortOrder);
  
    const queryParams = new URLSearchParams({
        startDate: startDate,
        endDate: endDate
      }).toString();
  
    try {
      const response = await fetch(`${REST}/api/pay/datefilter?${queryParams}`, {
        method: "GET", 
      });
  
      if (response.ok) {
        const data = await response.json(); 
        console.log("서버 응답:", data);
        if (onSubmit) {
          onSubmit(data,sortOrder); 
        }
        setShowDateFilter(false); 
      } else {
        console.error("서버 오류 발생", response.status);
      }
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
    }
  };

  const handlePresetRange = (range) => {
    const today = new Date();
    let start, end;

    switch (range) {
      case "Today":
        start = end = today.toLocaleDateString("en-CA");
        break;
      case "This Week":
        break;
      case "This Month":
        break;
      default:
        break;
    }

    setStartDate(start);
    setEndDate(end);
  };

  const toggleCalendar = (type) => {
    setCalendarType(type);
  };

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown); 
  };

  const handleSortChange = (order) => {
    console.log(order);
    
    setSortOrder(order);
    setShowSortDropdown(false); 
  };

  const tileClassName = ({ date, view, activeStartDate }) => {
    if (view === 'month') {
      const selectedMonth = activeStartDate.getMonth();
      const selectedYear = activeStartDate.getFullYear();

      if (date.getMonth() !== selectedMonth || date.getFullYear() !== selectedYear) {
        return 'hidden-date'; 
      }
    }
    if (view === 'month' && date.getDay() === 0) { // 일요일 (0)
      return 'sunday';
    }
    return null; 
  };

  const handleReset = () => {
    setStartDate(null); 
    setEndDate(null); 
  };

  return (
      <div className="modal-date">
        <div className="container-div">
          <form className="container">
            <div>
              <label htmlFor="startDate">From</label>
              <div className="inputdiv">
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={startDate || ""} 
                  readOnly
                />
                <button className="btn1" type="button" onClick={() => toggleCalendar("start")}>📅</button> {/* 달력 버튼 */}
              </div>
            </div>

            <div>
              <label htmlFor="endDate">To</label>
              <div className="inputdiv">
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={endDate || ""}  
                  readOnly
                />
                <button className="btn1" type="button" onClick={() => toggleCalendar("end")}>📅</button> {/* 달력 버튼 */}
              </div>
            </div>
          </form>

          <div className="day-div">
            <button className="day-btn" onClick={() => handlePresetRange("Today")}>Today</button>
            <button className="day-btn" onClick={() => handlePresetRange("This Week")}>This Week</button>
            <button className="day-btn" onClick={() => handlePresetRange("This Month")}>This Month</button>
          </div>

          <div>
            <label>Sort by</label>
            <div className="sort-div">
              <input 
                className="sort-input"
                type="text" 
                value={sortOrder === 'asc' ? '오름차순' : '내림차순'} 
                readOnly 
              />
              <button className="btn1" type="button" onClick={toggleSortDropdown}>
                ∨
              </button>
            </div>
              {showSortDropdown && (
                <div className="sort-dropdown">
                  <button onClick={() => handleSortChange("asc")}>오름차순</button>
                  <button onClick={() => handleSortChange("desc")}>내림차순</button>
                </div>
              )}
          </div>
        </div>

        <div className="button-container">
          <button className="reset-btn" type="button" onClick={handleReset}>리셋</button> 
          <button className="submit-btn" type="submit" onClick={handleapply}>적용하기</button>
        </div>
        

        {calendarType && (
          <div className="calendar-overlay">
            <div className="calendar-container">
              <Calendar
                onChange={calendarType === "start" ? handleStartDateChange : handleEndDateChange}
                value={calendarType === "start" ? new Date() : new Date()} 
                tileClassName={tileClassName}
                minDate={calendarType === "end" && startDate ? new Date(startDate) : null}
              />
            </div>
          </div>
        )}
      </div>
  );
};

export default DateFilter;
