import React, { useState, useEffect } from "react";
import Calendar from "react-calendar"; 
import './css/DateFilter.css';

const DateFilter = ({ onSubmit, onSortChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [calendarType, setCalendarType] = useState(""); 
  const [showSortDropdown, setShowSortDropdown] = useState(false); 

  
  const handleStartDateChange = (date) => {
    const localDate = new Date(date);
    setStartDate(localDate.toLocaleDateString("en-CA"));
    console.log("Start Date changed:", localDate.toLocaleDateString("en-CA")); // 디버깅
    setCalendarType(""); 
  };

  const handleEndDateChange = (date) => {
    const localDate = new Date(date); 
    setEndDate(localDate.toLocaleDateString("en-CA"));
    console.log("End Date changed:", localDate.toLocaleDateString("en-CA")); // 디버깅
    setCalendarType(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(startDate, endDate);
    }
  }; 

  const handleapply = async (e) => {
    e.preventDefault();
    console.log("form submit");
    console.log(startDate);
    console.log(endDate);
    
    const queryParams = new URLSearchParams({
        startDate: startDate,
        endDate: endDate
      }).toString();
  
    try {
      const response = await fetch(`http://localhost:8080/api/pay/datefilter?${queryParams}`, {
        method: "GET", 
      });
  
      
      if (response.ok) {
        const data = await response.json(); 
        console.log("서버 응답:", data);
        if (onSubmit) {
          onSubmit(data); 
        }

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
    return null; 
  };

  const handleReset = () => {
    setStartDate(null); 
    setEndDate(null); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="startDate">From</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate || ""} 
              readOnly
            />
            <button type="button" onClick={() => toggleCalendar("start")}>📅</button> {/* 달력 버튼 */}
          </div>

          <div>
            <label htmlFor="endDate">To</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate || ""}  
              readOnly
            />
            <button type="button" onClick={() => toggleCalendar("end")}>📅</button> {/* 달력 버튼 */}
          </div>
        </form>

        <div>
          <button onClick={() => handlePresetRange("Today")}>Today</button>
          <button onClick={() => handlePresetRange("This Week")}>This Week</button>
          <button onClick={() => handlePresetRange("This Month")}>This Month</button>
        </div>

        <div>
          <label>Sort by</label>
          <button type="button" onClick={toggleSortDropdown}>
            {sortOrder === "asc" ? "오름차순 ▼" : "내림차순 ▼"}
          </button>
          {showSortDropdown && (
            <div className="sort-dropdown">
              <button onClick={() => handleSortChange("asc")}>오름차순</button>
              <button onClick={() => handleSortChange("desc")}>내림차순</button>
            </div>
          )}
        </div>

        <div className="button-container">
          <button type="button" onClick={handleReset}>리셋</button> 
          <button type="submit" onClick={handleapply}>적용하기</button>
        </div>

        {calendarType && (
          <div className="calendar-overlay">
            <div className="calendar-container">
              <Calendar
                onChange={calendarType === "start" ? handleStartDateChange : handleEndDateChange}
                value={calendarType === "start" ? new Date() : new Date()} 
                tileClassName={tileClassName}  
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateFilter;
