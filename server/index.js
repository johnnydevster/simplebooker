const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
    res.send("<h1>Hello</h1>");
})

app.get('/api/get', (req, res) => {
    const bookingInfo = {
        "activity": req.query.activity,
        "year": req.query.year,
        "month": req.query.month,
        "date": req.query.date,
        "timeStart": req.query.timestart,
        "timeEnd": req.query.timeend,
        "userName": req.query.username,
        "userEmail": req.query.useremail,
        "googleId": req.query.googleId
    }
    res.send(bookingInfo);
})

app.listen(3001, () => {
    console.log('Running on port 3001');
});


/*`http://localhost:3001/api/get?activity=${selectedActivity}?year=${chosenYear}?month=${monthNames.indexOf(chosenMonth) + 1}?date=${chosenDate}?timestart=${selectedTimeStart}?timeend=${selectedTimeEnd}?userName=${userName}?userEmail=${userEmail}?googleId=${googleId}`*/