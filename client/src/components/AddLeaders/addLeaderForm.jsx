import { useState } from 'react';

const AddLeaderForm = ({ addLeader }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    phone: '',
    email: '',
    image: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, image: files });
  };

  const handleAddLeader = (e) => {
    e.preventDefault();
    // Validate required fields and ensure only one image is uploaded
    if (
      !formData.fullName ||
      !formData.bio ||
      !formData.phone ||
      !formData.email ||
      formData.image.length === 0 ||
      formData.image.length > 1
    ) {
      alert('Please fill in all required fields and upload one image.');
      return;
    }

    // Create a new leader object with the form data
    const newLeader = {
      ...formData,
      image: formData.image.map((file) => URL.createObjectURL(file)), // Convert files to object URLs
    };

    // Pass the new leader to the parent component
    addLeader(newLeader);

    // Reset the form
    setFormData({
      fullName: '',
      bio: '',
      phone: '',
      email: '',
      image: [],
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={() => addLeader(null)}>
          &times;
        </span>
        <form onSubmit={handleAddLeader}>
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
          <button className="submit-btn" type="submit">
            Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLeaderForm;
