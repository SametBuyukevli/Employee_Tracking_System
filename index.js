const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");

const adminRoutes = require('./routes/index');



app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);


// Flash Messages
app.use(flash());

app.use(function(req,res,next){
  res.locals.message = req.flash();
  res.locals.userName = req.session.userName;
  res.locals.isAuth = req.session.isAuth || 0;
  next();
})


app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/", adminRoutes);
const port = 4444;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  