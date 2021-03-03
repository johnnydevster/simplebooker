import React, {useState} from 'react';

function YearMonthPicker() {
  const [showDropdown, setShowdropdown] = useState(false);

  return (
    <div className="dropdown">
    <button onClick={() => setShowdropdown(!showDropdown)} className="dropbtn">Month</button>
      <div id="myDropdown" className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
        <a href="#">January</a>
        <a href="#">February</a>
        <a href="#">March</a>
        <a href="#">April</a>
        <a href="#">May</a>
        <a href="#">June</a>
        <a href="#">July</a>
        <a href="#">August</a>
        <a href="#">September</a>
        <a href="#">Oktober</a>
        <a href="#">November</a>
        <a href="#">December</a>
      </div>
    </div>
  )
}

//https://www.w3schools.com/howto/howto_js_dropdown.asp//

export default YearMonthPicker;
