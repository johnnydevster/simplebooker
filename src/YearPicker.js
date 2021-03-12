import React, {useEffect} from 'react';

function YearPicker(props) {
  const node = React.useRef();

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return;
    } else {
      props.setShowYearDropdown(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={node}>
      <button onClick={() => props.setShowYearDropdown(!props.showYearDropdown)}className="dropbtn yearpicker">{props.chosenYear}</button>
      <div id="myDropdown" className={`year-dropdown-content${props.showYearDropdown ? ' show' : ''}`}>
        <ul>
          {props.yearList.map((year, index) => {
            return <li key={index} value={year} onClick={(e) => {
              props.setChosenYear(e.target.value);
              props.setChosenDate(0);
              props.setShowYearDropdown(false);
            }}>{year}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

//https://www.w3schools.com/howto/howto_js_dropdown.asp//

export default YearPicker;
