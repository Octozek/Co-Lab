// client/src/pages/ComingEvents.jsx
import React, { useState } from 'react';
import './ComingEvents.css';

const ComingEvents = () => {
  // State to hold the list of events
  const [events, setEvents] = useState([]);
  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);
  // State to hold the form data for a new event
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    price: '',
    image: '',
    link: '',
  });
  // State to keep track of the headcount for each event
  const [headcounts, setHeadcounts] = useState({});

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes for the event image
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle adding a new event
  const handleAddEvent = () => {
    // Validate that required fields are filled
    if (!formData.name || !formData.date || !formData.image) {
      alert('Please fill in all required fields.');
      return;
    }
    // Add the new event to the events list
    setEvents([...events, { ...formData, id: events.length }]);
    // Close the modal
    setShowModal(false);
    // Reset the form data
    setFormData({
      name: '',
      date: '',
      price: '',
      image: '',
      link: '',
    });
  };

  // Handle checkbox changes to update the headcount
  const handleCheckboxChange = (eventId, isChecked) => {
    setHeadcounts((prevHeadcounts) => ({
      ...prevHeadcounts,
      [eventId]: (prevHeadcounts[eventId] || 0) + (isChecked ? 1 : -1),
    }));
  };

  return (
    <div className="coming-events">
      <h1>Coming Events</h1>
      {/* Button to open the modal for adding a new event */}
      <button className="add-event-btn" onClick={() => setShowModal(true)}>
        Add Event
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {/* Close button for the modal */}
            <span className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </span>
            {/* Form for adding a new event */}
            <div className="form-group">
              <label>Event Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Event Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Event Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Event Image</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Event Link</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
              />
            </div>
            <button className="submit-btn" onClick={handleAddEvent}>
              Add Event
            </button>
          </div>
        </div>
      )}
      {/* Display the list of events */}
      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event">
            <h2>{event.name}</h2>
            <p>Date: {event.date}</p>
            <p>Price: {event.price}</p>
            {event.image && <img src={URL.createObjectURL(event.image)} alt={event.name} />}
            {event.link && (
              <p>
                <a href={event.link} target="_blank" rel="noopener noreferrer">
                  More Info
                </a>
              </p>
            )}
            <div className="going">
              <label>
                <input
                  type="checkbox"
                  onChange={(e) => handleCheckboxChange(event.id, e.target.checked)}
                />
                Going?
              </label>
              <p>Headcount: {headcounts[event.id] || 0}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComingEvents;
