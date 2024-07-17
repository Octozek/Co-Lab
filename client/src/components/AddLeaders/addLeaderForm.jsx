import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_LEADER } from '../../utils/mutations';
import './AddLeaderForm.css';

const AddLeaderForm = ({ addLeader }) => {
  const [formState, setFormState] = useState({
    leaderName: '',
    leaderBio: '',
    leaderPhone: '',
    leaderEmail: '',
    leaderImage: '',
  });

  const [addLeaderMutation, { error }] = useMutation(ADD_LEADER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormState({
        ...formState,
        leaderImage: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addLeaderMutation({
        variables: { ...formState },
      });
      addLeader(data.addLeader);
      setFormState({
        leaderName: '',
        leaderBio: '',
        leaderPhone: '',
        leaderEmail: '',
        leaderImage: '',
      });
    } catch (e) {
      console.error('Error adding leader:', e);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={() => addLeader(null)}>
          &times;
        </span>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="leaderName">Name</label>
            <input
              type="text"
              id="leaderName"
              name="leaderName"
              value={formState.leaderName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="leaderBio">Bio</label>
            <textarea
              id="leaderBio"
              name="leaderBio"
              value={formState.leaderBio}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="leaderPhone">Phone</label>
            <input
              type="text"
              id="leaderPhone"
              name="leaderPhone"
              value={formState.leaderPhone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="leaderEmail">Email</label>
            <input
              type="email"
              id="leaderEmail"
              name="leaderEmail"
              value={formState.leaderEmail}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="leaderImage">Image</label>
            <input
              type="file"
              id="leaderImage"
              name="leaderImage"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="submit-btn">Add Leader</button>
        </form>
      </div>
    </div>
  );
};

export default AddLeaderForm;
