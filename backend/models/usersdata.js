const mongoose=require('mongoose')
const { Schema } = mongoose;
const userdata = new Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: true,
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true,
        
    },
    Address:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    Zip:{
        type:String,
        required:true
    }
  });
  const Userdata = mongoose.model('userdata',userdata);
  Userdata.createIndexes();
  module.exports = Userdata