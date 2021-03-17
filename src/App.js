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
    "Room 4"
  ]

  return (
    <div className="booking-main">
      <div className="headers-row">
        <div className="activity-header">
          <span>Name of activity here</span>
        </div>
        <div className="times-header">
          { bookableTimes.map((time) => {
            return <div className="timecell">{time}</div>
          }) }
        </div>
      </div>
      { activities.map(activity => {
        return (
          <div className="activity-container">
            <div className="activity">
              {activity}
            </div>
            <div className="time-row">
              {bookableTimes.map((time) => {
                return <div className="timecell"></div>
              })}
            </div>
          </div>
          )
      }) }
    </div>

  );
}

export default App;

/* <div className="activity-row">
        {activities.map((activity) => {
          return <div className="activity">{activity}</div>
        })}
      </div>
      <div className="time-row">

      </div> */