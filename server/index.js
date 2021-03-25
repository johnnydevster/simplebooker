const express = require('express');
const app = express();
const cors = require('cors');
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../client/config");
const pool = require('./db');
let user = {};

app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
    res.send("<h1>Hello</h1>");
})

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callbackURL: "http://localhost:3001/auth/google/callback"
}, (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    user = { ...profile };
    console.log(cb(null, profile));
    return cb(null, profile);
}))

app.use(passport.initialize());

app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}))
app.get("/auth/google/callback", passport.authenticate("google", (req, res) => {
    console.log(res);
    res.redirect("/user");
}));

app.get("/user", (req, res) => {
    console.log("getting user data");
    res.send(user);
});

app.get("/auth/logout", (req, res) => {
    console.log("logging out");
    user = {};
    res.redirect("/");
})

//Routes

//Get all bookings

//Create a booking

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

//Update a booking

//Delete a booking


app.listen(3001, () => {
    console.log('Running on port 3001');
});
