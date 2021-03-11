import React, {useEffect} from 'react';

function YearPicker(props) {

  return (
    <div className="dropdown">
      <button className="dropbtn yearpicker">{props.chosenYear}</button>
      <div id="myDropdown">
        <ul>
          
        </ul>
      </div>
    </div>
  )
}

//https://www.w3schools.com/howto/howto_js_dropdown.asp//

export default YearPicker;
