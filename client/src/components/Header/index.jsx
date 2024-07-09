import {Link} from 'react-router-dom';
export default function Header() {
    
    return (
        <header>
            <Link to ="/">Home</Link>
            <br/>
            <img src="https://via.placeholder.com/150" alt="Group Logo" />
            <br/>
            <Link to ="/Signup">Signup</Link>
            <br/>
            <Link to ="/Login">Login</Link>
            <h1>Group Title</h1>
            <Link to="/settings">
            <img src='../../../public/imgs/settings.png' alt='settings' />
            </Link>
        </header>
    )
    }