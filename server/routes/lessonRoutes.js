// server/routes/lessonRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const Lesson = require('../models/Lessons');

const upload = multer({ storage: multer.memoryStorage() });

// Get all lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new lesson
router.post('/', upload.fields([{ name: 'audio' }, { name: 'image' }]), async (req, res) => {
  try {
    const { lessonTitle, lessonDetails, lessonAuthor } = req.body;
    const newLesson = new Lesson({
      lessonTitle,
      lessonDetails,
      lessonAuthor,
      audio: req.files.audio ? req.files.audio[0].buffer.toString('base64') : null,
      image: req.files.image ? req.files.image[0].buffer.toString('base64') : null,
    });
    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a lesson
router.delete('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

    await lesson.remove();
    res.status(200).json({ message: 'Lesson deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
