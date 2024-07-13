import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ComingEvents.css';

const ComingEvents = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    price: '',
    image: '',
    link: '',
  });
  const [headcounts, setHeadcounts] = useState({});
  const [deleting, setDeleting] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/events`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [API_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleAddEvent = async () => {
    if (!formData.name || !formData.date || !formData.image) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('date', formData.date);
      data.append('price', formData.price);
      data.append('link', formData.link);
      data.append('image', formData.image);

      const response = await axios.post(`${API_URL}/events`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setEvents([...events, response.data]);
      setShowModal(false);
      setFormData({
        name: '',
        date: '',
        price: '',
        image: '',
        link: '',
      });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleCheckboxChange = (eventId, isChecked) => {
    setHeadcounts((prevHeadcounts) => ({
      ...prevHeadcounts,
      [eventId]: (prevHeadcounts[eventId] || 0) + (isChecked ? 1 : -1),
    }));
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`${API_URL}/events/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleDeleteButtonClick = () => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
    }, 10000);
  };

  return (
    <div className="coming-events">
      <h1>Coming Events</h1>
      <button className="add-event-btn" onClick={() => setShowModal(true)}>
        Add Event
      </button>
      <button className="delete-event-btn" onClick={handleDeleteButtonClick} style={{ backgroundColor: 'red' }}>
        Delete Event
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </span>
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
                accept="image/*"
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
      <div className="events-list">
        {Array.isArray(events) && events.map((event, index) => (
          <div
            key={index}
            className={`event ${deleting ? 'wiggle' : ''}`}
            onClick={() => {
              if (deleting) {
                if (window.confirm(`Are you sure you want to delete the event "${event.name}"?`)) {
                  handleDeleteEvent(event._id);
                }
              }
            }}
          >
            <h2>{event.name}</h2>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Price: {event.price}</p>
            {event.image && (
              <img src={`data:image/png;base64,${event.image}`} alt={event.name} />
            )}
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
                  onChange={(e) => handleCheckboxChange(event._id, e.target.checked)}
                />
                Going?
              </label>
              <p>Headcount: {headcounts[event._id] || 0}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComingEvents;
