const mongoose = require("mongoose");

//create schema
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        required:true,

    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("users",userSchema);