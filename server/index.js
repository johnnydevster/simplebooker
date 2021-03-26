const express = require('express');
const app = express();
const path = require("path");
const expressSession = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const cors = require('cors');
const pool = require('./db');
const authRouter = require("./auth");

require("dotenv").config();


app.use(express.json());
app.use(cors());

//Session Configuration

const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
};

if (app.get("env") === "production") {
    session.cookie.secure = true;
}

//Passport Configuration

const strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      /**
       * Access tokens are used to authorize users to an API
       * (resource server)
       * accessToken is the token to call the Auth0 API
       * or a secured third-party API
       * extraParams.id_token has the JSON Web Token
       * profile has all the information from the user
       */
      return done(null, profile);
    }
  );

//App Configuration

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use(expressSession(session));

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

app.use("/", authRouter);


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
