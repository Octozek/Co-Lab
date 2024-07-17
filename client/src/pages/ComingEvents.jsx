
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import Compressor from 'compressorjs';
import './ComingEvents.css';
import { QUERY_ME, QUERY_EVENTS } from "../utils/queries";
import { ADD_EVENT, DELETE_EVENT } from "../utils/mutations";



const ComingEvents = () => {
  const { loading, error, data } = useQuery(QUERY_EVENTS);
  const [addEvent] = useMutation(ADD_EVENT, {
    refetchQueries: [{ query: QUERY_EVENTS }],
  });
  const [deleteEvent] = useMutation(DELETE_EVENT, {
    refetchQueries: [{ query: QUERY_EVENTS }],
  });
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const currentUser = userData?.me || {};



  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    price: '',
    image: '',
    link: '',
  });
  const [deleting, setDeleting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    new Compressor(file, {
      quality: 0.6,
      success(result) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, image: reader.result.split(',')[1] });
        };
        reader.readAsDataURL(result);
      },
    });
  };

  const handleAddEvent = async () => {
    if (!formData.name || !formData.date || !formData.image) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      await addEvent({ variables: formData });
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
    if (window.confirm('Are you sure you want to delete the event?')) {
      try {
        await deleteEvent({ variables: { eventId } });
        setEvents(events.filter((event) => event._id !== eventId));
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

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

return (
  <div className="coming-events">
    <h1>Coming Events</h1>
    <div>
      {currentUser.role === 'Leader' && (
        <>
          <button className="add-event-btn" onClick={() => setShowModal(true)}>
            Add Event
          </button>
          <button className="delete-event-btn" onClick={handleDeleteButtonClick}>
            Delete Event
          </button>
        </>
      )}
    </div>
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
              step="0.01"
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
      {Array.isArray(data.getEvents) &&
        data.getEvents.map((event) => (
          <div
            key={event._id}
            className={`event ${deleting ? 'wiggle' : ''}`}
            onClick={() => handleEventClick(event._id)}
          >
            <div className="event-image">
              {event.image && (
                <img src={`data:image/png;base64,${event.image}`} alt={event.name} />
              )}
            </div>
            <div className="event-details">
              <div className="event-text">
                <h2>{event.name}</h2>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Price: {event.price}</p>
              </div>
              {event.link && (
                <p>
                  <a href={event.link} target="_blank" rel="noopener noreferrer">
                    More Info
                  </a>
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  </div>
);
};

export default ComingEvents;
