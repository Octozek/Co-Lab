import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ComingEvents.css';

const ComingEvents = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    price: '',
    image: '',
    link: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/events');
        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          console.error('Error: API response is not an array', response.data);
        }
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
    if (!formData.name || !formData.date || !formData.image) {
      alert('Name, date, and image are required.');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('date', formData.date);
      data.append('price', formData.price);
      data.append('link', formData.link);
      data.append('image', formData.image);

      const response = await axios.post('http://localhost:3001/api/events', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
    try {
      await axios.delete(`http://localhost:3001/api/events/${eventId}`);
      setEvents(events.filter((event) => event._id !== eventId));
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

  const handleEventClick = (eventId, eventName) => {
    if (deleting) {
      const confirmDelete = window.confirm(`Are you sure you want to delete the event "${eventName}"?`);
      if (confirmDelete) {
        handleDeleteEvent(eventId);
      }
    }
  };

  return (
    <div className="coming-events">
      <h1>Coming Events</h1>
      <div className="button-group">
        <button className="add-event-btn" onClick={() => setShowModal(true)}>Add Event</button>
        <button className="delete-event-btn" onClick={handleDeleteButtonClick}>Delete Event</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
            <div className="form-group">
              <label>Event Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Event Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Event Price</label>
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Event Image</label>
              <input type="file" name="image" onChange={handleFileChange} accept="image/*" required />
            </div>
            <div className="form-group">
              <label>Event Link</label>
              <input type="url" name="link" value={formData.link} onChange={handleInputChange} />
            </div>
            <button className="submit-btn" onClick={handleAddEvent}>Add Event</button>
          </div>
        </div>
      )}
      <div className="events-list">
        {Array.isArray(events) && events.map((event, index) => (
          <div
            key={index}
            className={`event ${deleting ? 'wiggle' : ''}`}
            onClick={() => handleEventClick(event._id, event.name)}
          >
            <h2>{event.name}</h2>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Price: {event.price}</p>
            {event.image && <img src={`data:image/png;base64,${event.image}`} alt={event.name} />}
            {event.link && <p><a href={event.link} target="_blank" rel="noopener noreferrer">More Info</a></p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComingEvents;
