const express = require('express');
const mongoose = require('mongoose');
const { generateLocationMessage } = require('./middleware/functions')
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
// var http  = require('http').createServer(app)
//var sockets = require('socket.io').listen(http)
var SocketIo = require('socket.io')

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

  // http.listen(3000, () => {
  //   console.log('Server started')
  // });

  //const server = 
  app.listen(3000, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('server listening on port: %s', 3000);
  });

//   const io = new SocketIo(server, {path: '/check'})
// const socketEvents = require('./sockets')(io);

 // var io = sockets;
 
  

