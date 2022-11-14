const mongoose=require('mongoose')
const { Schema } = mongoose;
const users = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
  });
  const User = mongoose.model('user',users);
  User.createIndexes();
  module.exports = User