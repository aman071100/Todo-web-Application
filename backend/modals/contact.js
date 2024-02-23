const mongoose = require("mongoose");
const User = require("./user")

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    image :{
        type : String,
        required : true
    },
    email :{
        type:String,
        required : true
    },
    address :{
        type:String,
        required : true
    },
    phone : {
        type:Number,
        required : true
    },
}, {timestamps : true})

const Contact = mongoose.model('Contact', contactSchema);
module.exports= Contact;