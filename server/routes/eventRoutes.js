const express = require('express');
const multer = require('multer');
const router = express.Router();
const Event = require('../models/Event');

const upload = multer({ storage: multer.memoryStorage() });

// Create a new event
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const event = new Event({
      name: req.body.name,
      date: req.body.date,
      price: req.body.price,
      link: req.body.link,
      image: req.file ? req.file.buffer.toString('base64') : null
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    await event.remove();
    res.status(200).json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
