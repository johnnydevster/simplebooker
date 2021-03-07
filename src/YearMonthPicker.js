

function YearMonthPicker(props) {
  
  return (
    <div className="buttons-container">
      <div className="iconcontainer"><i className="fa fa-angle-left"></i></div>
      <div className="dropdown">
        <button onClick={() => props.setShowdropdown(!props.showDropdown)} className="dropbtn">{props.chosenMonth}</button>
        <div id="myDropdown" className={`dropdown-content ${props.showDropdown ? 'show' : ''}`}>
          <ul>
            {props.monthNames.map((month, index) => {
              return <li key={index} value={index} onClick={(e) => {
                props.setChosenMonth(props.monthNames[e.target.value]);
                props.setChosenDate(0)
              }}>{month}</li>
            })}
          </ul>
        </div>
      </div>
      <div className="iconcontainer"><i className="fa fa-angle-right"></i></div>
    </div>
  )
}

//https://www.w3schools.com/howto/howto_js_dropdown.asp//

export default YearMonthPicker;
