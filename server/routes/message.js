const express = require('express')
const router = express.Router()
const Message = require('../database/models/message')

router.get('/messages',(req,res) =>{

    Message.find({},(err,message)=>{
        if(err) {
            console.log(err);
            return res.status(500).json({msg: 'internal server error'});
          }
          res.json(message);
    });

});

router.get('/messages/:channelId',(req,res)=>{
    var id = req.params.channelId;

    Message.find({channelId : id} ,(err,message)=>{
        if(err) {
            console.log(err);
            return res.status(500).json({msg: 'internal server error'});
          }
          res.json(message);
    });
});

router.post('/new_messages',(req,res)=>{

    var newMessage = new Message(req.body);
    newMessage.save(function (err, message) {
        if(err) {
          console.log(err);
          return res.status(500).json({msg: 'internal server error'});
        }
        res.json(message);
      });

});

module.exports = router