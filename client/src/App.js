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
    "Room 4",
    "Room 5",
    "Room 6",
    "Room 7",
    "Court 1"
  ]

  const [selectedActivity, setSelectedActivity] = useState();
  const [selectedTimeStart, setSelectedTimeStart] = useState();
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(selectedTimeStart);

  /*const bookingMatrix = {};

  -- Probably dont need this, but good way of populating an object --

  for (let i of activities) {
    bookingMatrix[i] = bookableTimes;
  }
  */

  function handleBookcellClick(activity, time) {
    setSelectedActivity(activity);
    setSelectedTimeStart(time);
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
              {bookableTimes.map((time) => {
                const cellIsSelected = (activity === selectedActivity && time === selectedTimeStart);
                return <div
                  className={`bookcell${cellIsSelected ? ' selected-middle' : ''}`}
                  onClick={() => handleBookcellClick(activity, time)}>
                  <div className={`time-end-picker${cellIsSelected ? ' visible' : ' hidden'}`}>
                    <button className="time-pick-btn">1h</button>
                    <button className="time-pick-btn">2h</button>
                  </div>
                </div>
              })}
            </div>
          </div>
          )
      }) }
      </div>
      {<Calendar />}
    </div>
  );
}

export default App;