const io = require('socket.io')();
const Message = require('./config/db');

const socketapi = {
    io: io
}
// Logic Setup
io.on('connection', async function (socket) {
    console.log("new User Connected");
    // const messages = await Message.find().sort({timestamp:1}).limit(50);

    socket.on('joinRoom', async (roomName) => {
        socket.join(roomName);

        // Sends The 100 msg
            const messages = await Message.find({roomName}).sort({timestamp:1}).limit(100)

            messages.forEach(msg => {
                socket.emit('incomingMessage', msg) // Past user data Send And Show 
    })
    })

    socket.on('deleteMessage',async (msgId)=>{
        await Message.findByIdAndDelete(msgId);
        console.log('messagedelete',msgId);
        // all useer see thw delete 
        socket.broadcast.emit('messageDeleted',msgId)
    });

    socket.on('sony', async (msg) => {
        const newmsg = new Message(msg);
        const savedmsg = await newmsg.save();
        // socket.broadcast.to(msg.roomName).emit('incomingMessage',msg);
        io.to(msg.roomName).emit('incomingMessage',savedmsg);
    })
})
module.exports = socketapi