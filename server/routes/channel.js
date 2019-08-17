const express = require('express')
const router = express.Router()
const Channel = require('../database/models/channel')
const User = require('../database/models/user')

router.get('/allChannels',(req,res) =>{

    Channel.find({},(err,message)=>{
      console.log(message)
        if(err) {
            console.log(err);
            return res.status(500).json({msg: 'internal server error'});
          }
          res.json(message);
    });

});

router.post('/new_channel',(req,res)=>{

    var newChannel = new Channel(req.body);
    //console.log(newChannel)
    newChannel.save(function (err, message) {
        if(err) {
          console.log(err);
          return res.status(500).json({msg: 'internal server error'});
        }
        res.json(message);
      });

});

router.get('/channels/:name',(req,res)=>{

    Channel.find({},(err,message)=>{
      console.log(message.length)
        if(err) {
            console.log(err);
            return res.status(500).json({msg: 'internal server error'});
          }

          let arr = []
          for(let i=0;i<message.length;i++){
            
            for(let j=0;j<message[i].between.length;j++){
              if(req.params.name === message[i].between[j].username){
                arr.push(message[i])
              }
            }
          }
          console.log(arr)
          res.json(arr);
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