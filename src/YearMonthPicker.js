

function YearMonthPicker(props) {
  
  return (
    <div className="buttons-container">
      <div className="dropdown">
        <button onClick={() => props.setShowdropdown(!props.showDropdown)} className="dropbtn">{props.chosenMonth}</button>
        <div id="myDropdown" className={`dropdown-content ${props.showDropdown ? 'show' : ''}`}>
          <ul>
            {props.monthNames.map((month, index) => {
              return <li key={index} value={index} onClick={(e) => props.setChosenMonth(props.monthNames[e.target.value])}>{month}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

//https://www.w3schools.com/howto/howto_js_dropdown.asp//

export default YearMonthPicker;
