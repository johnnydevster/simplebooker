import './App.scss';
import React, {useState, useEffect} from 'react';
import Calendar from './Calendar';

function App() {

  const bookableTimes = [];
  for (var i = 6; i <= 22; i++) {
    bookableTimes.push(('0' + i).slice(-2));
  }

  const activities = [
    "Room 1",
    "Room 2",
    "Room 3",
    "Room 10",
    "Court 1"
  ]

  const [selectedActivity, setSelectedActivity] = useState();
  const [selectedTime, setSelectedTime] = useState();

  /*const bookingMatrix = {};
  -- Probably dont need this --
  for (let i of activities) {
    bookingMatrix[i] = bookableTimes;
  }
  */

  function handleBookcellClick(activity, time) {
    setSelectedActivity(activity);
    setSelectedTime(time);
    console.log(time === selectedTime);
    console.log(time);
    console.log(parseInt(time) + 1);
  }

  useEffect(() => {
    
  })

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
                return <div 
                  className={`bookcell${activity === selectedActivity && time === selectedTime ? ' selected' : ''}`}
                  onClick={() => handleBookcellClick(activity, time)}>
                  </div>
              }) }
            </div>
           
          </div>
          )
      }) }
      </div>
      {/*<Calendar />*/}
    </div>
  );
}

export default App;