import React, {useState, useEffect} from 'react';
import YearPicker from './YearPicker';
import MonthPicker from './MonthPicker';

function Calendar() {
  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  const [showDropdown, setShowdropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [chosenYear, setChosenYear] = useState(new Date().getFullYear());
  const [chosenMonth, setChosenMonth] = useState(monthNames[new Date().getMonth()]);
  const [chosenDate, setChosenDate] = useState();

  const getDaysInMonth = function(month, year) {
    return new Date(year, month, 0).getDate();
  };

  const yearList = [];
  for (var i = new Date().getFullYear(); i <= new Date().getFullYear() + 10; i++) {
    yearList.push(i);
  }
  
  const dateArray = [];
  for (var i = 1; i <= getDaysInMonth(monthNames.indexOf(chosenMonth) + 1, chosenYear); i++) { //replace with chosen month and year
    dateArray.push(i);
  }

  return (
    <div className="calendar-main">
      <div className="yearmonth-container">
        <YearPicker
          chosenYear={chosenYear}
          setChosenYear={setChosenYear}
          setChosenDate={setChosenDate}
          yearList={yearList}
          showYearDropdown={showYearDropdown}
          setShowYearDropdown={setShowYearDropdown} />
        <MonthPicker
          monthNames={monthNames}
          showDropdown={showDropdown}
          setShowdropdown={setShowdropdown}
          chosenYear={chosenYear}
          chosenMonth={chosenMonth}
          setChosenYear={setChosenYear}
          setChosenMonth={setChosenMonth}
          setChosenDate={setChosenDate}
        />
      </div>
      <div className="datenumbers-container">
        {dateArray.map(date => {
          return (
            <div className={`datenumbers${parseInt(chosenDate, 10) === date ? ' highlight' : ''}`} onClick={(e) => {setChosenDate(e.target.innerHTML)}} >{date}</div>
          )
        })}
      </div>
    </div>
  );
}

export default Calendar;
