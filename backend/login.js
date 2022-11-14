const express = require('express');
const User = require('./models/users');
const route=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodboy';

route.post('/',[body('password','Enter a valid password').exists(),body('email','Enter a valid E-mial').isEmail()], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
    const {email,password}=req.body;
    try {
      const user= await User.findOne({email});
      if (!user) {
        var success=false
        return res.status(400).json({ errors: errors.array()});
      }
      const passwordcompare= await bcrypt.compare(password,user.password)
      if (!passwordcompare) {
        success=false
        return res.status(400).json({success,errors: errors.array()});
      }
      const data={
        user:{
         id:user.id
        }
      }
      const jwttoken=jwt.sign(data,JWT_SECRET)
      success=true
      res.json({success,jwttoken})
    } catch (err) {
      res.json({ errors:'please enter a valid email', message: err.message})
    }
  })
  module.exports=route