// client/src/pages/PastEvents.jsx
import React, { useState } from 'react';
import './PastEvents.css';

const PastEvents = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    images: [],
  });
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 6) {
      alert('You can only upload up to 6 images.');
      return;
    }
    setFormData({ ...formData, images: files });
  };

  const handleAddPastEvent = () => {
    if (!formData.title || !formData.date || formData.images.length === 0) {
      alert('Please fill in all required fields and upload at least one image.');
      return;
    }
    setPastEvents([...pastEvents, { ...formData, id: pastEvents.length }]);
    setShowModal(false);
    setFormData({
      title: '',
      date: '',
      images: [],
    });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleCloseEventModal = () => {
    setSelectedEvent(null);
    setShowEventModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEvents = pastEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.date.includes(searchQuery)
  );

  return (
    <div className="past-events">
      <h1>Past Events</h1>
      <button className="add-event-btn" onClick={() => setShowModal(true)}>
        Add Past Event
      </button>
      <input
        type="text"
        placeholder="Search by title or date"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <div className="form-group">
              <label>Event Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
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
              <label>Upload Images (up to 6)</label>
              <input
                type="file"
                name="images"
                onChange={handleFileChange}
                multiple
                accept="image/*"
                required
              />
            </div>
            <button className="submit-btn" onClick={handleAddPastEvent}>
              Done
            </button>
          </div>
        </div>
      )}
      <div className="events-list">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event" onClick={() => handleEventClick(event)}>
            <div className="event-overlay">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-date">{event.date}</p>
            </div>
            <div className="event-images-scattered">
              {event.images.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt={event.title} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {showEventModal && selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={handleCloseEventModal}>
              &times;
            </span>
            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.date}</p>
            <div className="event-images-grid">
              {selectedEvent.images.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt={selectedEvent.title} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastEvents;
