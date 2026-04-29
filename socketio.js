const io = require('socket.io')();
const Message = require('./config/db');

const socketapi = {
    io:io
}
// Logic Setup
io.on('connetion',async function(socket){
    console.log("new User Connected");
    const messages = await Message.find().sort({timestamp:1}).limit(50);

    messages.forEach(msg=>{
        socket.emit('incomingMessage',msg.content)
    })

    socket.on('newmsg', async (msg)=>{
        socket.broadcast.emit('incomingMessage',msg)

        const message = new Message({content:msg});
        await message.save();
    })
})
module.exports = socketapi