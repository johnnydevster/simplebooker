import './App.scss';
import React, {useState, useEffect} from 'react';
import Calendar from './Calendar';
import GoogleLogin from 'react-google-login';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken;
}

function App() {
  const token = getToken();

  const timeStart = 6;
  const timeEnd = 22;

  const bookableTimes = [];
  for (var i = timeStart; i <= timeEnd; i++) {
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
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();

  /*const bookingMatrix = {};

  -- Probably dont need this, but good way of populating an object --

  for (let i of activities) {
    bookingMatrix[i] = bookableTimes;
  }
  */

  function handleTimeEndChange(e, time) {
    e.stopPropagation();
    if (time <= timeEnd) {
      setSelectedTimeEnd(time);
    }
  }

  function handleBookcellClick(activity, time) {
    setSelectedActivity(activity);
    setSelectedTimeStart(parseInt(time));
    setSelectedTimeEnd(parseInt(time));
  }

  function responseGoogle(response) {
    setToken(response.accessToken);
    const userName = response.profileObj.givenName + ' ' + response.profileObj.familyName;
    const userEmail = response.profileObj.email;
    setUserName(userName);
    setUserEmail(userEmail);
  }

  function GoogleLoginButton() {
    if (!token) {
      return (
        <GoogleLogin
          clientId="1015056177817-7toba522dep62e09vj1oegf05k55ut44.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true} />
      )
    } else {
      return null;
    }
  }

  useEffect(() => {
    console.log(!token);
    
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
      {<GoogleLoginButton />}
    </div>
  );
}

export default App;