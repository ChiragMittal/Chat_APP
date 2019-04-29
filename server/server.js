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


// mongoose.connect('mongodb://127.0.0.1:27017/chat_app', { useMongoClient : true });
// mongoose.connection.on('error', error => console.log(error) );
// mongoose.Promise = global.Promise;

//require('./middleware/auth/auth');


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
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) 

const routes = require('./routes/user');



app.use('/', routes);

//app.use('/user', passport.authenticate('jwt', { session : false }), secureRoute );


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