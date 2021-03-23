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

  function handleTimeEndChange(e, time) {
    e.stopPropagation();
    setSelectedTimeEnd(time);

  }

  function handleBookcellClick(activity, time) {
    setSelectedActivity(activity);
    setSelectedTimeStart(parseInt(time));
    setSelectedTimeEnd(parseInt(time));
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

                const singleCellSelected = (activity === selectedActivity && selectedTimeEnd - selectedTimeStart === 0);
                const twoCellsSelected = (activity === selectedActivity && selectedTimeEnd - selectedTimeStart === 1);
                const moreCellsSelected = (activity === selectedActivity && selectedTimeEnd - selectedTimeStart > 1)

                return <div
                  className={`
                    ${activity === selectedActivity && parseInt(time) === selectedTimeStart ? 'bookcell-active' : 'bookcell'}
                    ${singleCellSelected && parseInt(time) === selectedTimeStart ? ' selected-single' : ''}
                    ${(twoCellsSelected || moreCellsSelected) && parseInt(time) === selectedTimeStart && !singleCellSelected ? ' selected-first' : ''}
                    ${moreCellsSelected && parseInt(time) > selectedTimeStart && time < selectedTimeEnd ? ' selected-middle' : ''}
                    ${(twoCellsSelected || moreCellsSelected) && parseInt(time) === selectedTimeEnd ? 'selected-end' : ''}`}
                  onClick={() => handleBookcellClick(activity, time)}>
                  <div className={`time-end-picker${activity === selectedActivity && selectedTimeStart === parseInt(time) ? ' visible' : ' hidden'}`}>
                    <button className="time-pick-btn" onClick={() => setSelectedTimeEnd(selectedTimeStart)}>1h</button>
                    <button className="time-pick-btn" onClick={(e) => handleTimeEndChange(e, selectedTimeStart + 1)}>2h</button>
                    <button className="time-pick-btn" onClick={(e) => handleTimeEndChange(e, selectedTimeStart + 2)}>3h</button>
                    <button className="time-pick-btn bookit">Book it</button>
                  </div>
                </div>
              })}
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