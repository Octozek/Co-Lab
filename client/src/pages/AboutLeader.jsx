import { useState } from "react";
import "./PastEvents.css";
import { useQuery } from "@apollo/client";
import { QUERY_LEADERS } from "../utils/queries";

const AboutLeaders = () => {
  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);


  // State to manage form data for adding a new leader
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    phone: "",
    email: "",
    image: [],
  });

  // State to store the list of leaders
  const [leaders, setLeaders] = useState([]);

  // Handle input changes in the form and update formData state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes and update formData state with the uploaded files
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, image: files });
  };

  const handleAddLeader = async () => {
    // Validate required fields and ensure only one image is uploaded
    if (
      !formData.fullName ||
      !formData.bio ||
      !formData.phone ||
      !formData.email ||
      formData.image.length === 0 ||
      formData.image.length > 1
    ) {
      alert("Please fill in all required fields and upload one image.");
      return;
    }

    // Create a new leader object with the form data
    const newLeader = {
      ...formData,
      image: formData.image.map((file) => URL.createObjectURL(file)), // Convert files to object URLs
    };

    // Add the new leader to the leaders list and reset the form
    setLeaders([...leaders, newLeader]);
    setShowModal(false);
    setFormData({
      fullName: "",
      bio: "",
      phone: "",
      email: "",
      image: [],
    });
  };

  return (
    <div className="leaders">
      <h2>Leaders</h2>
      <button className="add-event-btn" onClick={() => setShowModal(true)}>
        Add Leader
      </button>

      {/* Display the list of leaders */}
      {leaders.map((leader, index) => (
        <div key={index} className="leader-card">
          <h3>{leader.fullName}</h3>
          <p>{leader.bio}</p>
          {leader.phone && <p>Phone: {leader.phone}</p>}
          {leader.email && <p>Email: {leader.email}</p>}
          {leader.image.map((imgSrc, i) => (
            <img
              key={i}
              src={imgSrc}
              alt={`${leader.fullName} photo ${i + 1}`}
              className="leader-photo"
            />
          ))}
        </div>
      ))}

      {/* Display the modal for adding a new leader */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </span>

            {/* Form to input new leader details */}
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Upload Photo</label>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                multiple
                accept="image/*"
                required
              />
            </div>
            <button className="submit-btn" onClick={handleAddLeader}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default AboutLeaders;