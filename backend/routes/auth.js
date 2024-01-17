const express = require('express');
const User = require('../models/User');
const router = express.Router()
const { body, validationResult } = require('express-validator');

//create user using POST "/api/auth/"

router.post('/',[
    body('name', 'lease enter a valid name').isLength({ min: 3 }),
    body('email', 'Please enter a valid email').isEmail(),
  // password must be at least 5 chars long
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
] ,(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

      }).then(user => res.json(user)).catch(err=> {console.log(err)
        res.json({error: 'Please enter unique email or name value', message: err.message})})
})

module.exports = router