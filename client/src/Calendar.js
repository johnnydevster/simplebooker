import React, {useState, useEffect} from 'react';
import YearPicker from './YearPicker';
import MonthPicker from './MonthPicker';

function Calendar(props) {

  const [showDropdown, setShowdropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const getDaysInMonth = function(month, year) {
    return new Date(year, month, 0).getDate();
  };

  const yearList = [];
  for (var i = props.currentYear; i <= props.currentYear + 10; i++) {
    yearList.push(i);
  }
  
  const dateArray = [];
  for (var i = 1; i <= getDaysInMonth(props.monthNames.indexOf(props.chosenMonth) + 1, props.chosenYear); i++) { //replace with chosen month and year
    dateArray.push(i);
  }

  useEffect(() => {
    
  })

  return (
    <div className="calendar-main">
      <div className="yearmonth-container">
        <YearPicker
          chosenYear={props.chosenYear}
          setChosenYear={props.setChosenYear}
          setChosenDate={props.setChosenDate}
          yearList={yearList}
          showYearDropdown={showYearDropdown}
          setShowYearDropdown={setShowYearDropdown} />
        <MonthPicker
          monthNames={props.monthNames}
          showDropdown={showDropdown}
          setShowdropdown={setShowdropdown}
          chosenYear={props.chosenYear}
          chosenMonth={props.chosenMonth}
          setChosenYear={props.setChosenYear}
          setChosenMonth={props.setChosenMonth}
          setChosenDate={props.setChosenDate}
        />
      </div>
      <div className="day-headers">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div className="sunday">Sun</div>
      </div>
      <div className="datenumbers-container">
        {dateArray.map(date => {
          return (
            <div className={
              `datenumbers
              ${props.chosenDate === date ? ' highlight' : ''}
              ${(date === props.currentDate && props.monthNames.indexOf(props.chosenMonth) === props.currentMonth && props.chosenYear === props.currentYear) ? ' todays-date' : ''}
              ${(date < props.currentDate && props.monthNames.indexOf(props.chosenMonth) === props.currentMonth && props.chosenYear === props.currentYear) || (props.chosenYear <= props.currentYear && props.monthNames.indexOf(props.chosenMonth) < props.currentMonth) || props.chosenYear < props.currentYear ? 'passed-date' : ''}`
            } onClick={(e) => {props.setChosenDate(parseInt(e.target.innerHTML, 10))}} >{date}</div>
          )
        })}
      </div>
    </div>
  );
}

export default Calendar;
