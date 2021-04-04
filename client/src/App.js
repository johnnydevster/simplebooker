import './App.scss';
import React, {useState, useEffect} from 'react';
import Calendar from './Calendar';
import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import Axios from 'axios';
import { GOOGLE } from './config.js';



function App() {

  const timeStart = 6;
  const timeEnd = 22;

  const bookableTimes = [];
  for (var i = timeStart; i <= timeEnd; i++) {
    bookableTimes.push(('0' + i).slice(-2));
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

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

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  const [chosenYear, setChosenYear] = useState(currentYear);
  const [chosenMonth, setChosenMonth] = useState(monthNames[currentMonth]);
  const [chosenDate, setChosenDate] = useState(currentDate);

  /*const bookingMatrix = {};

  -- Probably dont need  but good way of populating an object --

  for (let i of activities) {
    bookingMatrix[i] = bookableTimes;
  }
  */

  function logout() {
    setIsAuthenticated(false);
    setToken('');
    setUser(null);
  }


  function twitterResponse(e) {

  }

  function facebookResponse(e) {

  }

  function googleResponse(response) {

    //This code probably doesnt work with Axios. Redo later.

    console.log(response)
    /*
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type: 'application/json'});
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    Axios.post('http://localhost:3001/api/v1/auth/google', options).then(response => {
      const token = response.headers.get('x-auth-token');
      response.json().then(user => {
        if (token) {
          setIsAuthenticated(true);
          setUser(user);
          setToken(token);
        }
      })
    })
    */
    const config = {
      headers: { Authorization: `Bearer ${response.tokenId}` }
    }
    const bodyParameters = {
      key: 'value'
    };

    Axios.post(
      'http://localhost:3001/api/auth/google',
      bodyParameters,
      config
      ).then((res) => {
      console.log(res);
    }, (error) => {
      console.log(error);
    });

  }

  function onFailure(error) {
    console.log(error);
  }

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

  function resetSelection() {
    setSelectedActivity();
    setSelectedTimeStart();
    setSelectedTimeEnd();
  }

  function handleBooking(e) {

  }


  useEffect(() => {
    console.log(GOOGLE.clientID)
  }, []);

  const authenticatedContent = !!isAuthenticated ?
    (
      <div>
        <p>Authenticated</p>
        <div>
          {user.email}
        </div>
        <div>
          <button onClick={logout} className="button">
            Log out
                        </button>
        </div>
      </div>
    ) :
    (
      <div>
        <TwitterLogin loginUrl="http://localhost:3000/api/v1/auth/twitter"
          onFailure={twitterResponse} onSuccess={twitterResponse}
          requestTokenUrl="http://localhost:3000/api/v1/auth/twitter/reverse" />
        <FacebookLogin
          appId="XXXXXXXXXX"
          autoLoad={false}
          fields="name,email,picture"
          callback={facebookResponse} />
        <GoogleLogin
          clientId={GOOGLE.clientID}
          buttonText="Login"
          onSuccess={googleResponse}
          onFailure={onFailure}
        />
      </div>
    );

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
                    <button className="time-pick-btn bookit" onClick={(e) => {handleBooking(e)}}>Book it</button>
                  </div>
                </div>
              })}
            </div>
          </div>
          )
      }) }
      </div>
      {<Calendar
         monthNames={monthNames}
         currentDate={currentDate}
         currentMonth={currentMonth}
         currentYear={currentYear}
         chosenYear={chosenYear}
         chosenMonth={chosenMonth}
         chosenDate={chosenDate}
         setChosenYear={setChosenYear}
         setChosenMonth={setChosenMonth}
         setChosenDate={setChosenDate}
         resetSelection={resetSelection}
         />}
      {authenticatedContent}
      <div class="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  );
}

export default App;