const express = require('express');
const router = express.Router();
const PastEvent = require('../models/PastEvent');
const multer = require('multer');
const upload = multer();

router.get('/', async (req, res) => {
  try {
    const pastEvents = await PastEvent.find();
    res.json(pastEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', upload.array('images', 6), async (req, res) => {
  try {
    const { title, date } = req.body;
    const images = req.files.map(file => file.buffer.toString('base64'));
    const pastEvent = new PastEvent({ title, date, images });
    await pastEvent.save();
    res.status(201).json(pastEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
