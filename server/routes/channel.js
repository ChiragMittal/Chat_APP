const express = require('express')
const router = express.Router()
const Channel = require('../database/models/channel')
const User = require('../database/models/user')

router.get('/channels',(req,res) =>{

    Channel.find({},(err,message)=>{
        if(err) {
            console.log(err);
            return res.status(500).json({msg: 'internal server error'});
          }
          res.json(message);
    });

});

router.post('/new_channel',(req,res)=>{

    var newChannel = new Channel(req.body);
    
    newChannel.save(function (err, message) {
        if(err) {
          console.log(err);
          return res.status(500).json({msg: 'internal server error'});
        }
        res.json(message);
      });

});

router.get('/channels/true/:name',(req,res)=>{
    Channel.find({ $or: [ {between: req.params.name}, {private: true } ] }, (err, message)=> {
        if(err) {
          console.log(err);
          return res.status(500).json({msg: 'internal server error'});
        }
  
        res.json(message);
      });
});

router.get('/channels/false/:name',(req,res)=>{
  Channel.find({ $or: [ {between: req.params.name}, {private: false } ] }, (err, message)=> {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(message);
    });
});

module.exports = router