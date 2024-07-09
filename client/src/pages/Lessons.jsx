import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faFileDownload } from '@fortawesome/free-solid-svg-icons';

const Lessons = () => {
  // Example lesson plans data (you would fetch or define this data)
  const [lessonPlans, setLessonPlans] = useState([]);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDate, setNewLessonDate] = useState('');
  const [newLessonSummary, setNewLessonSummary] = useState('');
  const [newLessonIcon, setNewLessonIcon] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    // Example: Fetch lesson plans from an API
    fetch('https://api.example.com/lesson-plans')
      .then(response => response.json())
      .then(data => setLessonPlans(data))
      .catch(error => console.error('Error fetching lesson plans:', error));
  }, []);

  const handleAddLesson = () => {
    // Example: Add a new lesson plan
    const newLesson = {
      title: newLessonTitle,
      date: newLessonDate,
      summary: newLessonSummary,
      icon: newLessonIcon,
      // Add other properties as needed (e.g., author, description)
    };

    // Example: Send new lesson plan to an API (simulated)
    fetch('https://api.example.com/lesson-plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLesson),
    })
      .then(response => response.json())
      .then(data => {
        setLessonPlans([...lessonPlans, data]); // Update lesson plans with the newly added lesson
        setNewLessonTitle('');
        setNewLessonDate('');
        setNewLessonSummary('');
        setNewLessonIcon('');
      })
      .catch(error => console.error('Error adding lesson:', error));
  };

  const handleDeleteLesson = (lessonId) => {
    // Example: Delete a lesson plan
    fetch(`https://api.example.com/lesson-plans/${lessonId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedLessonPlans = lessonPlans.filter(lesson => lesson.id !== lessonId);
        setLessonPlans(updatedLessonPlans);
      })
      .catch(error => console.error('Error deleting lesson:', error));
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setUploadedFile(uploadedFile);
  };

  const handleFileDownload = () => {
    if (uploadedFile) {
      const downloadUrl = URL.createObjectURL(uploadedFile);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', uploadedFile.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <h1>Lessons</h1>
      <p>Welcome to the lessons page!</p>

      {/* Form for creating a new lesson */}
      <form onSubmit={(e) => { e.preventDefault(); handleAddLesson(); }}>
        <label>
          Title:
          <input
            type="text"
            value={newLessonTitle}
            onChange={(e) => setNewLessonTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            value={newLessonDate}
            onChange={(e) => setNewLessonDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Summary:
          <textarea
            value={newLessonSummary}
            onChange={(e) => setNewLessonSummary(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Icon URL:
          <input
            type="text"
            value={newLessonIcon}
            onChange={(e) => setNewLessonIcon(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Add Lesson</button>
      </form>

      {/* File upload input */}
      <input type="file" onChange={handleFileUpload} />

      {/* Display uploaded file details and download button */}
      {uploadedFile && (
        <div>
          <p>Uploaded File: {uploadedFile.name}</p>
          <button onClick={handleFileDownload}>
            <FontAwesomeIcon icon={faFileDownload} /> Download
          </button>
        </div>
      )}

      {/* List of existing lesson plans */}
      <ul>
        {lessonPlans.map(lessonPlan => (
          <li key={lessonPlan.id}>
            <h2>{lessonPlan.title}</h2>
            <p>Date: {lessonPlan.date}</p>
            <p>Summary: {lessonPlan.summary}</p>
            <img src={lessonPlan.icon} alt="Lesson Icon" style={{ maxWidth: '100px' }} />
            <button onClick={() => handleDeleteLesson(lessonPlan.id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lessons;
