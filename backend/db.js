const mongoose = require('mongoose');
const mongoURI="mongodb+srv://mayurjadhav:videochar@cluster0.1on23hp.mongodb.net/videochataplication";
const connecttodatabase= async ()=>{
    try {
        await mongoose.connect(mongoURI,()=>{
            console.log("Connected to Mongo Successfully");
        });
      } catch (error) {
        handleError(error);
      }
}
module.exports=connecttodatabase
