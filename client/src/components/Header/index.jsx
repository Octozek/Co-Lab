import {Link} from 'react-router-dom';
export default function Header() {
    
    return (
        <header>
            <Link to ="/">Home</Link>
            <img src="https://via.placeholder.com/150" alt="Group Logo" />
            <h1>Group Title</h1>
            <Link to="/settings">Settings</Link>
        </header>
    )
    }