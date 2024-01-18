const express = require('express');
const User = require('../models/User');
const router = express.Router()
const { body, validationResult } = require('express-validator');

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
        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })     
      res.json(user)
    }catch(error){
      console.error(error.message)
      res.status(500).send("Some error occured")
    }
})

module.exports = router