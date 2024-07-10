import React, { useState, useEffect } from 'react';
import './ComingEvents.css';

const ComingEvents = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    price: '',
    image: null,
    link: '',
  });

  useEffect(() => {
    // Example: Fetch events from an API
    fetch('https://api.example.com/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleAddEvent = () => {
    // Validate form data
    if (!formData.name || !formData.date || !formData.image) {
      alert('Please fill in all required fields.');
      return;
    }

    // Simulate adding event to the list (replace with API call)
    const newEvent = {
      name: formData.name,
      date: formData.date,
      price: formData.price,
      image: formData.image,
      link: formData.link,
    };

    setEvents([...events, newEvent]);
    setFormData({
      name: '',
      date: '',
      price: '',
      image: null,
      link: '',
    });
    setShowModal(false);
  };

  return (
    <div className="coming-events">
      <h1>Coming Events</h1>

      <button className="add-event-btn" onClick={() => setShowModal(true)}>
        Add Event
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <form onSubmit={(e) => { e.preventDefault(); handleAddEvent(); }}>
              <div className="form-group">
                <label>Event Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Event Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Event Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Event Image:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Event Link:</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="submit-btn">Add Event</button>
            </form>
          </div>
        </div>
      )}

      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event">
            <h2>{event.name}</h2>
            <p>Date: {event.date}</p>
            {event.price && <p>Price: {event.price}</p>}
            {event.image && <img src={URL.createObjectURL(event.image)} alt={event.name} />}
            {event.link && (
              <p>
                <a href={event.link} target="_blank" rel="noopener noreferrer">
                  More Info
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComingEvents;
