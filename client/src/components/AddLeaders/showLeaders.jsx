const ShowLeaders = ({ leaders }) => {
  return (
    <div>
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
    </div>
  );
};

export default ShowLeaders;
