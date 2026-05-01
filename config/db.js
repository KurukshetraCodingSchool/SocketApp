const mongoose=require('mongoose')
const mongodb= mongoose.connect('mongodb://0.0.0.0/Socketapp').then(()=>{
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