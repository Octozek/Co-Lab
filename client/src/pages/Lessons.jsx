import React, { useState, useRef, useEffect } from 'react';
import './Lessons.css';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    audio: null,
    image: null,
  });
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const audioRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [audioRef.current]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleRecord = async () => {
    if (recording) {
      mediaRecorder.stop();
      mediaStream.getTracks().forEach(track => track.stop()); // Stop all tracks to turn off the mic
      setRecording(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newMediaRecorder = new MediaRecorder(stream);
      setMediaStream(stream);
      newMediaRecorder.ondataavailable = (e) => {
        const audioBlob = new Blob([e.data], { type: 'audio/wav' });
        const audioURL = URL.createObjectURL(audioBlob);
        setFormData({ ...formData, audio: audioBlob });
        setAudioURL(audioURL);
      };
      newMediaRecorder.start();
      setMediaRecorder(newMediaRecorder);
      setRecording(true);
    }
  };

  const handleAddLesson = () => {
    if (recording) {
      mediaRecorder.stop();
      mediaStream.getTracks().forEach(track => track.stop()); // Stop all tracks to turn off the mic
      setRecording(false);
    }
    if (!formData.title || !formData.content) {
      alert('Please fill in all required fields.');
      return;
    }
    setLessons([...lessons, { ...formData, id: lessons.length }]);
    setShowModal(false);
    setFormData({
      title: '',
      content: '',
      audio: null,
      image: null,
    });
    setAudioURL(null);
  };

  const handleCardClick = (lesson) => {
    if (deleting) {
      if (window.confirm('Are you sure you want to delete this lesson?')) {
        setLessons(lessons.filter(l => l.id !== lesson.id));
      }
    } else {
      setCurrentLesson(lesson);
      setShowModal(true);
      if (lesson.audio) {
        const audioURL = URL.createObjectURL(lesson.audio);
        audioRef.current.src = audioURL;
      }
    }
  };

  const closeModal = () => {
    setCurrentLesson(null);
    setShowModal(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setAudioProgress(0);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setAudioProgress(progress);
    }
  };

  const handleAudioProgressChange = (e) => {
    if (audioRef.current) {
      const newTime = (e.target.value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  const handleDeleteLesson = () => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
    }, 10000);
  };

  return (
    <div className="lessons">
      <h1>Lessons</h1>
      <button className="add-lesson-btn" onClick={() => setShowModal(true)}>
        Add Lesson
      </button>
      <button className="delete-lesson-btn" onClick={handleDeleteLesson}>
        Delete Lesson
      </button>
      {showModal && !currentLesson && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <div className="form-group">
              <label>Lesson Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Lesson Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Lesson Image</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <button
              className={`record-btn ${recording ? 'recording' : ''}`}
              onClick={handleRecord}
              style={{ backgroundColor: recording ? 'red' : 'green' }}
            >
              {recording ? 'Stop Recording' : 'Record'}
            </button>
            <button className="submit-btn" onClick={handleAddLesson}>
              Done
            </button>
          </div>
        </div>
      )}
      {showModal && currentLesson && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close-btn" onClick={closeModal}>
                &times;
              </span>
              <h2 className="lesson-title">{currentLesson.title}</h2>
              <p className="lesson-date">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="modal-body">
              <div className="lesson-text">
                <p>{currentLesson.content}</p>
              </div>
            </div>
            {currentLesson.audio && (
              <div className="audio-controls">
                <button onClick={handlePlayPause}>
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <input
                  type="range"
                  value={audioProgress}
                  onChange={handleAudioProgressChange}
                  style={{ width: '100%' }}
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div className="lessons-list">
        {lessons.map((lesson, index) => (
          <div
            key={index}
            className={`lesson ${deleting ? 'wiggle' : ''}`}
            onClick={() => handleCardClick(lesson)}
          >
            {lesson.image && (
              <img
                src={URL.createObjectURL(lesson.image)}
                alt="Lesson"
                className="lesson-image"
              />
            )}
            <div className="lesson-details">
              <h2>{lesson.title}</h2>
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>{lesson.content.substring(0, 100)}...</p>
            </div>
          </div>
        ))}
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default Lessons;
