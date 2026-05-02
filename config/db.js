const mongoose=require('mongoose')
const mongodb= mongoose.connect('mongodb://0.0.0.0/joinroom').then(()=>{
    console.log('connected✅');
}).catch((error)=>{
    console.log(error);
})
const socketSchema =  mongoose.Schema({
    username : String,
    msg : String,
    roomName:String,
    // timestamps:{
    //     type:Date,
    //     default:Date.now
    // }
},{
    timestamps:true
})
module.exports =mongoose.model('Chat',socketSchema);