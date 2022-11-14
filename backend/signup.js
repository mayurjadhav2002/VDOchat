const express = require('express');
const User = require('./models/users');
const Userdata = require('./models/usersdata');
const route=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodboy';
// create a user using /app/signup/
route.post('/',[body('username','Enter a valid name').isLength({ min: 5 }),body('Password','Enter a valid password').isLength({ min: 5 }),body('email','Enter a valid E-mial').isEmail()], async(req, res) => {
    const errors = validationResult(req);
    var success=false;
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({ errors: errors.array()});
    }
    try{
    var salt = bcrypt.genSaltSync(10);
    var hash = await bcrypt.hashSync(req.body.Password, salt);
    user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password:hash,
    })
    userdata = await Userdata.create({
      userid:user._id,
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      Address:req.body.Address,
      City:req.body.City,
      State:req.body.State,
      Zip:req.body.Zip,
    })
    const data ={
      id:user.id
    }
    const jwttoken=jwt.sign(data,JWT_SECRET)
    success=true;
    res.json({success,jwttoken})
    
  }catch (err){
    res.json({ errors:'please enter a valid email', message: err.message})
  }
  })
// create a user using /app/login/

module.exports=route