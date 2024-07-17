import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_LEADER } from '../../utils/mutations';

const AddLeaderForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    phone: '',
    email: '',
    image: '',
  });

  const [addLeader, { loading, error }] = useMutation(ADD_LEADER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleAddLeader = async (e) => {
    e.preventDefault();

    try {
      const { fullName, bio, phone, email, image } = formData;
      console.log(formData)
      const { data } = await addLeader({
        variables: {
          leaderName: fullName,
          leaderBio: bio,
          leaderPhone: phone,
          leaderEmail: email,
          leaderImage: image,
        },
      });

      console.log('Leader added:', data.addLeader);

      // Reset the form
      setFormData({
        fullName: '',
        bio: '',
        phone: '',
        email: '',
        image: null,
      });

      alert('Leader added successfully!');
    } catch (error) {
      console.error('Error adding leader:', error);
      alert('Error adding leader');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
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
          {/* <div className="form-group">
            <label>Upload Photo</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div> */}
          <button className="submit-btn" type="submit">
            Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLeaderForm;
