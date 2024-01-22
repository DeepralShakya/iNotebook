const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');

//get all notes using: GET "/api/notes/getuser"
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
    const notes = await Note.find({user: req.user.id});
    res.json(notes)      
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
}
})

//add new node using: POST "/api/notes/addnote"
router.post('/addnote', fetchuser, [
    body('title', 'Please enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res)=>{
    try {
    const {title, description, tag} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title, description, tag, user: req.user.id
    })
    const savedNotes = await note.save()
    res.json(savedNotes)
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")  
}
})

module.exports = router