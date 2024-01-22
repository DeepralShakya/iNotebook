const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Deepral';

//create user using POST "/api/auth/"

router.post('/createuser',[
    body('name', 'lease enter a valid name').isLength({ min: 3 }),
    body('email', 'Please enter a valid email').isEmail(),
  // password must be at least 5 chars long
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
] ,async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try{
    let user = await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({error: "User with this email already exist"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })     
    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken})
  
    }catch(error){
      console.error(error.message)
      res.status(500).send("Some error occured")
    }
})

module.exports = router