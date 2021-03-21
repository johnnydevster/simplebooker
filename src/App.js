import './App.scss';
import React, {useState, useEffect} from 'react';
import Calendar from './Calendar';

function App() {

  const bookableTimes = [];
  for (var i = 6; i <= 22; i++) {
    bookableTimes.push(i);
  }

  const activities = [
    "Room 1",
    "Room 2",
    "Room 3",
    "Room 4",
    "Room 5",
    "Room 6",
    "Room 10"
  ]

  return (
    <div className="booking-main">
      <div className="headers-row">
        <div className="activity-header">
        </div>
        <div className="times-header">
          { bookableTimes.map((time) => {
            return <div className="timecell">{time}</div>
          }) }
        </div>
      </div>
      <div className="main-grid-container">
      { activities.map(activity => {
        return (
          <div className="activity-container">
            <div className="activity">
              { activity }
            </div>
            
            <div className="time-row">
              { bookableTimes.map((time) => {
                return <div className="bookcell"></div>
              }) }
            </div>
           
          </div>
          )
      }) }
      </div>
      <Calendar />
    </div>

  );
}

export default App;