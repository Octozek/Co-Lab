import React from "react";
import './ShowLeaders.css';

const ShowLeaders = ({ leaders, onLeaderClick }) => {
  return (
    <div className="leaders-list">
      {leaders.map((leader) => (
        <div
          key={leader._id}
          className="leader-card"
          onClick={() => onLeaderClick(leader)}
        >
          {leader.leaderImage && (
            <img
              src={leader.leaderImage}
              alt={leader.leaderName}
              className="leader-image-circle"
            />
          )}
          <div className="leader-name">{leader.leaderName}</div>
        </div>
      ))}
    </div>
  );
};

export default ShowLeaders;
