const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
    res.send("<h1>Hello</h1>");
})

app.get('/api/get', (req, res) => {
    const bookingInfo = {
        "activity": req.query.activity,
        "date": req.query.date,
        "timeStart": req.query.timestart,
        "timeEnd": req.query.timeend,
        "userName": req.query.user,
        "userEmail": req.query.useremail,
        "googleId": req.query.googleid
    }
    res.send(bookingInfo);
})

//Routes

//Get all bookings

//Create a booking

//Update a booking

//Delete a booking


app.listen(3001, () => {
    console.log('Running on port 3001');
});
