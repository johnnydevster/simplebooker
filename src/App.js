import './App.scss';
import React, {useState, useEffect} from 'react';
import YearMonthPicker from './YearMonthPicker';

function App() {
  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]

  const [showDropdown, setShowdropdown] = useState(false);
  const [chosenMonth, setChosenMonth] = useState(monthNames[new Date().getMonth()]);
  const [chosenDate, setChosenDate] = useState();

  const getDaysInMonth = function(month, year) {
    return new Date(year, month, 0).getDate();
  };
  
  const dateArray = [];
  for (var i = 1; i <= getDaysInMonth(monthNames.indexOf(chosenMonth) + 1, 2021); i++) { //replace with chosen month and year
    dateArray.push(i);
  }

  useEffect(() => {
    console.log(chosenDate)
  })

  return (
    <div className="simplebooker-main">
      <YearMonthPicker 
        monthNames={monthNames}
        showDropdown={showDropdown}
        setShowdropdown={setShowdropdown}
        chosenMonth={chosenMonth}
        setChosenMonth={setChosenMonth}
        setChosenDate={setChosenDate}
        />
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

export default App;
