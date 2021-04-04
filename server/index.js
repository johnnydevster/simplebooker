const express = require('express');
const app = express();
const passport = require("passport");
const cors = require('cors');
const pool = require('./db');

require("dotenv").config();


app.use(express.json());
app.use(cors());

app.post('/api/auth/google', (req, res) => {
    console.log(req.headers.authorization);
    res.send(req.body.data);
})

app.post('/api/post', async(req, res) => {
    try {

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

app.listen(3001, () => {
    console.log('Running on port 3001');
});
