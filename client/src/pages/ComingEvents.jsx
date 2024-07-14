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
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleAddEvent = async () => {
    // Validate required fields
    if (!formData.name) {
      alert('Please add a name.');
      return;
    }
    if (!formData.date) {
      alert('Please add a date.');
      return;
    }
    if (!formData.image) {
      alert('Please add an image.');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('date', formData.date);
      data.append('price', formData.price);
      data.append('link', formData.link);
      data.append('image', formData.image);

      const response = await axios.post('/api/events', data, {
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

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm(`Are you sure you want to delete the event?`)) {
      try {
        await axios.delete(`/api/events/${eventId}`);
        setEvents(events.filter(event => event._id !== eventId));
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleDeleteButtonClick = () => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
    }, 10000);
  };

  const handleEventClick = (eventId) => {
    if (deleting) {
      handleDeleteEvent(eventId);
    }
  };

  return (
    <div className="coming-events">
      <h1>Coming Events</h1>
      <button className="add-event-btn" onClick={() => setShowModal(true)}>
        Add Event
      </button>
      <button className="delete-event-btn" onClick={handleDeleteButtonClick}>
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
        {Array.isArray(events) && events.map((event) => (
          <div
            key={event._id}
            className={`event ${deleting ? 'wiggle' : ''}`}
            onClick={() => handleEventClick(event._id)}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComingEvents;
