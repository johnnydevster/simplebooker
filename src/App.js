import './App.scss';
import React, {useState} from 'react';
import YearMonthPicker from './YearMonthPicker';

function App() {
  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]

  const [showDropdown, setShowdropdown] = useState(false);
  const [chosenMonth, setChosenMonth] = useState(monthNames[new Date().getMonth()]);

  const getDaysInMonth = function(month, year) {
    return new Date(year, month, 0).getDate();
  };
  
  const dateArray = [];
  for (var i = 1; i <= getDaysInMonth(3, 2021); i++) { //replace with chosen month and year
    dateArray.push(i);
  }

  return (
    <div className="simplebooker-main">
      <YearMonthPicker 
        monthNames={monthNames}
        showDropdown={showDropdown}
        setShowdropdown={setShowdropdown}
        chosenMonth={chosenMonth}
        setChosenMonth={setChosenMonth}
        />
      <div className="datenumbers-container">
        {dateArray.map(item => {
          return (
            <div className="datenumbers">{item}</div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
