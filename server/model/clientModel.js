const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:false
    },
    phone:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    latitude:{
        type:String,
        required:true
    },
    longitude:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:false
    }
})

const Client = mongoose.model('client',schema)
module.exports = Client