const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const morgan     = require("morgan");
const helmet = require('helmet');
const path = require("path");
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./database') 
const config = require('./configuration/index')


app.use(morgan("dev"));
// app.use(express.static("./"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "x-auth");
    res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE,PATCH');
    next();
});

app.use(
	session({
		secret: config.session.key, 
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) 

const routes_user = require('./routes/user');
const routes_message = require('./routes/message');
const routes_channel = require('./routes/channel');



app.use('/', routes_user);
app.use('/', routes_message);
app.use('/', routes_channel);


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});

app.get("*",(req, res) => {
    //res.sendFile(express.static(path.join(__dirname,"../index.html")));
    //res.sendFile(__dirname ,'../index.html');
    res.sendFile(path.join(__dirname,"../index.html"));
  });

app.listen(3000, () => {
  console.log('Server started')
});