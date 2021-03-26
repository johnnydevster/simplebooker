import './App.scss';
import React, {useState, useEffect} from 'react';
import Calendar from './Calendar';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import Axios from 'axios';

/*
function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken;
}
*/

Axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

function App() {
/*  const token = getToken();*/

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
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [googleId, setGoogleId] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [chosenYear, setChosenYear] = useState(currentYear);
  const [chosenMonth, setChosenMonth] = useState(monthNames[currentMonth]);
  const [chosenDate, setChosenDate] = useState(currentDate);

  const chosenDateFormatted = `${chosenYear}-${('0' + (monthNames.indexOf(chosenMonth) + 1)).slice(-2)}-${chosenDate}`
  const queryString = `?activity=${selectedActivity}&date=${chosenDateFormatted}&timestart=${selectedTimeStart}&timeend=${selectedTimeEnd}&user=${userName}&useremail=${userEmail}&googleid=${googleId}`

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

  function resetSelection() {
    setSelectedActivity();
    setSelectedTimeStart();
    setSelectedTimeEnd();
  }

  function handleBooking(e) {
    e.stopPropagation();

    Axios.post(encodeURI(`http://localhost:3001/api/post${queryString}`)).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
    resetSelection();
  }

  function handleLogin() {
    Axios.get('http://localhost:3001/login').then((result) => {
      console.log(result);
    })
  }

  function handleLogout() {

  }

  function LoginButton() {
    if (isAuthenticated) {
      return (
        <button onClick={() => handleLogout()}>Logout</button>
      )
    } else {
      return (
        <button onClick={() => handleLogin()}>Login</button>
      )
    }
  }


/*
  function responseGoogle(response) {
    setToken(response.accessToken);
    const userName = response.profileObj.givenName + ' ' + response.profileObj.familyName;
    const userEmail = response.profileObj.email;
    const googleId = response.profileObj.googleId
    setUserName(userName);
    sessionStorage.setItem('user', userName)
    setUserEmail(userEmail);
    sessionStorage.setItem('email', userEmail)
    setGoogleId(googleId);
    sessionStorage.setItem('googleId', googleId)
  }

  function logout() {
    console.log('logged out');
  }
*/

/*
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
      return (
        <GoogleLogout 
          clientId="1015056177817-7toba522dep62e09vj1oegf05k55ut44.apps.googleusercontent.com"
          buttonText="Logout from Google"
          onLogoutSuccess={logout}
        />
      )
    }
  }
*/

  useEffect(() => {
    
    const loggedInUser = sessionStorage.getItem("user");
    const loggedInEmail = sessionStorage.getItem("email");
    const loggedInGoogleId = sessionStorage.getItem("googleId");
    if (loggedInUser) {
        setUserName(loggedInUser);
        setUserEmail(loggedInEmail);
        setGoogleId(loggedInGoogleId);
    }
  }, []);

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
      <LoginButton />
    </div>
  );
}

export default App;