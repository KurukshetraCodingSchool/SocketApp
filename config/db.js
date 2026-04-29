const mongoose=require('mongoose')
const mongodb= mongoose.connect('mongodb://127.0.0.1:27017/Socketapp').then(()=>{
    console.log('db connected✅');
}).catch((error)=>{
    console.log(error);
})
const socketSchema =  mongoose.Schema({
    content: String,
    timestamp:{
        type:Date,
        default:Date.now
    }
})
module.exports =mongoose.model('Chat',socketSchema);