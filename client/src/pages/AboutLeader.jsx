import { useState } from 'react';
import './PastEvents.css';
import AddLeaderForm from '../components/AddLeaders/addLeaderForm';
import ShowLeaders from '../components/AddLeaders/showLeaders';
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";


const AboutLeaders = () => {
  const [showModal, setShowModal] = useState(false);
  const [leaders, setLeaders] = useState([]);
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const currentUser = userData?.me || {};

  const handleAddLeader = (newLeader) => {
    if (newLeader) {
      setLeaders([...leaders, newLeader]);
    }
    setShowModal(false);
  };

  return (
    <div className="leaders">
      <h2>Leaders</h2>
      {currentUser.role === "Leader" && (
      <button className="add-event-btn" onClick={() => setShowModal(true)}>
        Add Leader
      </button>
       )}
      <ShowLeaders leaders={leaders} />
      {showModal && <AddLeaderForm addLeader={handleAddLeader} />}
    </div>
  );
};

export default AboutLeaders;
