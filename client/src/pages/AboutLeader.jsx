import { useState } from 'react';
import './PastEvents.css';
import AddLeaderForm from '../components/AddLeaders/addLeaderForm';
import ShowLeaders from '../components/AddLeaders/showLeaders';

const AboutLeaders = () => {
  const [showModal, setShowModal] = useState(false);
  const [leaders, setLeaders] = useState([]);

  const handleAddLeader = (newLeader) => {
    if (newLeader) {
      setLeaders([...leaders, newLeader]);
    }
    setShowModal(false);
  };

  return (
    <div className="leaders">
      <h2>Leaders</h2>
      <button className="add-event-btn" onClick={() => setShowModal(true)}>
        Add Leader
      </button>
      <ShowLeaders leaders={leaders} />
      {showModal && <AddLeaderForm addLeader={handleAddLeader} />}
    </div>
  );
};

export default AboutLeaders;
