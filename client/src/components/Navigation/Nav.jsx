import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

export default function Nav() {

  if (!Auth.loggedIn()) {
    return null;
  }

  return (
    <nav className="icons-container">
      <div className="nav-link">
        <Link to="/coming-events">
          <img
            src="./imgs/upcoming-events.png"
            alt="upcoming events"
          />
        </Link>
      </div>
      <div className="nav-link">
        <Link to="/past-events">
          <img
            src="./imgs/previous-events.png"
            alt="previous events"
          />
        </Link>
      </div>
      <div className="nav-link">
        <Link to="/lessons">
          <img src="./imgs/lessons.png" alt="lessons" />
        </Link>
      </div>
      <div className="nav-link">
        <Link to="/chat">
          <img src="./imgs/chat.png" alt="chat" />
        </Link>
      </div>
      <div className="nav-link">
        <Link to="/about-leader">
          <img src="./imgs/leaders.png" alt="about leader" />
        </Link>
      </div>
      <div className="nav-link">
        <Link to="/games">
          <img src="./imgs/games.png" alt="games" />
        </Link>
      </div>
    </nav>
  );
}
