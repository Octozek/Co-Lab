import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_LEADERS } from "../utils/queries";
import { ADD_LEADER, REMOVE_LEADER } from "../utils/mutations";
import AddLeaderForm from "../components/AddLeaders/addLeaderForm";
import ShowLeaders from "../components/AddLeaders/showLeaders";
import './AboutLeaders.css';

const AboutLeaders = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [showLeaderDetails, setShowLeaderDetails] = useState(false);
  const [notification, setNotification] = useState(null);

  const { loading, data, refetch } = useQuery(QUERY_LEADERS);
  const [addLeader] = useMutation(ADD_LEADER, {
    onCompleted: () => refetch(),
  });
  const [removeLeader] = useMutation(REMOVE_LEADER, {
    onCompleted: () => {
      refetch();
      setNotification(null);
    },
  });
  const leaders = data?.getLeaders || [];

  const handleAddLeader = (newLeader) => {
    if (newLeader) {
      setShowModal(false);
      refetch();
    }
  };

  const handleDeleteButtonClick = () => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      setSelectedLeader(null);
    }, 10000);
  };

  const handleLeaderClick = (leader) => {
    if (deleting) {
      setSelectedLeader(leader);
      setNotification({
        message: `Do you want to delete ${leader.leaderName}?`,
        onConfirm: () => handleDeleteLeader(leader._id),
      });
    } else {
      setSelectedLeader(leader);
      setShowLeaderDetails(true);
    }
  };

  const handleDeleteLeader = async (leaderId) => {
    await removeLeader({ variables: { leaderId } });
    setSelectedLeader(null);
    setShowLeaderDetails(false);
  };

  const closeNotification = () => {
    setNotification(null);
    setSelectedLeader(null);
  };

  return (
    <div className="leaders">
      <h2>Leaders</h2>
      <button className="add-leader-btn" onClick={() => setShowModal(true)}>
        Add Leader
      </button>
      <button className="delete-leader-btn" onClick={handleDeleteButtonClick}>
        Delete Leader
      </button>
      <ShowLeaders leaders={leaders} onLeaderClick={handleLeaderClick} />

      {showModal && <AddLeaderForm addLeader={handleAddLeader} />}

      {notification && (
        <div className="notification">
          <p>{notification.message}</p>
          <button onClick={notification.onConfirm}>Yes</button>
          <button onClick={closeNotification}>No</button>
        </div>
      )}

      {showLeaderDetails && selectedLeader && (
        <div className="leader-details-modal">
          <div className="leader-details-content">
            <span
              className="close-btn"
              onClick={() => setShowLeaderDetails(false)}
            >
              &times;
            </span>
            <div className="leader-details-image">
              <img src={selectedLeader.leaderImage} alt={selectedLeader.leaderName} />
            </div>
            <div className="leader-details-info">
              <h3>{selectedLeader.leaderName}</h3>
              <p>{selectedLeader.leaderBio}</p>
              <p>{selectedLeader.leaderPhone}</p>
              <p>{selectedLeader.leaderEmail}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutLeaders;
