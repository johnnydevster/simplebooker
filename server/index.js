const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
    res.send("<h1>Hello</h1>");
})



//Routes

//Get all bookings

//Create a booking

app.post('/api/post', async(req, res) => {
    try {
        /*const bookingInfo = {
            "activity": req.query.activity,
            "date": req.query.date,
            "timeStart": req.query.timestart,
            "timeEnd": req.query.timeend,
            "userName": req.query.user,
            "userEmail": req.query.useremail,
            "googleId": req.query.googleid
        }*/

        const bookingInfo = [
            req.query.activity,
            req.query.date,
            req.query.timestart,
            req.query.timeend,
            req.query.user,
            req.query.useremail,
            req.query.googleid
        ]

        const newBooking = await pool.query("INSERT INTO bookings (activity, date, time_start, time_end, user_name, user_email, google_id) VALUES($1, $2, $3, $4, $5, $6, $7)",
          bookingInfo
          )

        res.send(bookingInfo);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a booking

//Delete a booking


app.listen(3001, () => {
    console.log('Running on port 3001');
});
