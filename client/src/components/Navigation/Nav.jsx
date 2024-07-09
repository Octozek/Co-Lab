import {Link} from 'react-router-dom';
export default function Nav() {
    return (
        <nav>
            <div>
            <Link to="/coming-events">Upcoming Events</Link>
            </div>
            <div>
            <Link to="/past-events">Past Events</Link>
            </div>
            <div>
            <Link to="/lessons">Lessons</Link>
            </div>
            <div>
            <Link to="/chat">Chat</Link>
            </div>
            <div>
            <Link to="/about-leader">Leaders</Link>
            </div>
            <div>
            <Link to="/games">Games</Link>
            </div>
        </nav>
    )
}