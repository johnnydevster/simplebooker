import React, {useState} from 'react';

function YearMonthPicker() {
  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "Oktober", "November", "December"
  ]

  const [showDropdown, setShowdropdown] = useState(false);
  const [chosenMonth, setChosenMonth] = useState(monthNames[new Date().getMonth()])

 

  return (
    <div className="buttons-container">
      <div className="dropdown">
        <button onClick={() => setShowdropdown(!showDropdown)} className="dropbtn">{chosenMonth}</button>
        <div id="myDropdown" className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
          <ul>
            {monthNames.map((month, index) => {
              return <li key={index}>{month}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

//https://www.w3schools.com/howto/howto_js_dropdown.asp//

export default YearMonthPicker;
