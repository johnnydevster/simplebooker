import React, {useEffect} from 'react';

function MonthPicker(props) {
  const node = React.useRef();

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return;
    } else {
      props.setShowdropdown(false);
    }
  }

  const handleLeftArrow = () => {
    if (props.monthNames.indexOf(props.chosenMonth) > 0) {
      props.setChosenMonth(props.monthNames[props.monthNames.indexOf(props.chosenMonth) - 1]);
    } else {
      props.setChosenMonth(props.monthNames[11]);
      props.setChosenYear(props.chosenYear - 1);
    }
  }

  const handleRightArrow = () => {
    if (props.monthNames.indexOf(props.chosenMonth) < 11) {
      props.setChosenMonth(props.monthNames[props.monthNames.indexOf(props.chosenMonth) + 1]);
    } else {
      props.setChosenMonth(props.monthNames[0]);
      props.setChosenYear(props.chosenYear + 1);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="monthbuttons-container">
      <div className="iconcontainer" onClick={handleLeftArrow}><i className="fa fa-angle-left"></i></div>
      <div className="dropdown" ref={node}>
        <button onClick={() => props.setShowdropdown(!props.showDropdown)} className="dropbtn">{props.chosenMonth}</button>
        <div id="myDropdown" className={`dropdown-content ${props.showDropdown ? 'show' : ''}`}>
          <ul>
            {props.monthNames.map((month, index) => {
              return <li key={index} value={index} onClick={(e) => {
                props.setChosenMonth(props.monthNames[e.target.value]);
                props.setChosenDate(0);
                props.setShowdropdown(false);
              }}>{month}</li>
            })}
          </ul>
        </div>
      </div>
      <div className="iconcontainer" onClick={handleRightArrow}><i className="fa fa-angle-right"></i></div>
    </div>
  )
}

//https://www.w3schools.com/howto/howto_js_dropdown.asp//

export default MonthPicker;
