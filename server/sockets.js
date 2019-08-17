const { generateLocationMessage } = require('./middleware/functions')

exports = module.exports = function(io) {
  io.on('connection', function(socket){
    socket.join('Room');
  
    socket.on('chat mounted', function(user) {
        socket.emit('receive socket', socket.id)
      })
    socket.on('leave channel', function(channel) {
        socket.leave(channel)
      })
    socket.on('join channel', function(channel) {
        socket.join(channel.name)
      })
    socket.on('new message', function(msg) {
        socket.broadcast.to(msg.channelID).emit('new message', msg);
      })
    socket.on('new channel', function(channel) {
         socket.broadcast.emit('new channel', channel)
         console.log("new channel made")
       // io.emit('new channel', channel)
      })
    socket.on('typing', function (data) {
        socket.broadcast.to(data.channel).emit('typing ', data.user);
      })
    socket.on('stop typing', function (data) {
        socket.broadcast.to(data.channel).emit('stop typing ', data.user);
      })
    socket.on('new private channel', function(socketID, channel) {
        socket.broadcast.to(socketID).emit('receive private channel', channel);
      })
    socket.on('createLocationMessage',function(data,lat,lng){
        socket.broadcast.to(data.channel).emit('new location message',generateLocationMessage(data.user, lat, lng));
    })      
  });
}