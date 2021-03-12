import './App.scss';
import React, {useState, useEffect} from 'react';
import Calendar from './Calendar';

function App() {

  const bookableTimes = [];
  for (var i = 6; i <= 22; i++) {
    bookableTimes.push(i);
  }


  return (
    <div className="booking-main">
      <div className="activity-header">
        <span>Name of activity here</span>
      </div>
      <div className="times-header">
        {bookableTimes.map((time) => {
          return <div className="timecell">{time}</div>
        })}
      </div>
    </div>
  );
}

export default App;
