import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <Link to="/">Home</Link>
      <br />
      <div className="profilePic">
      <img src="https://via.placeholder.com/150" alt="Group Logo" />
      </div>
      <br />
      <div>
        {Auth.loggedIn() ? (
          <>
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-lg btn-info m-2" to="/login">
              Login
            </Link>
            <br />
            <Link className="btn btn-lg btn-light m-2" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
      <h1>Group Title</h1>
      <div className="settings-icon">
      <Link to="/settings">
        <img src='./imgs/settings.png' alt='settings' />
      </Link>
      </div>
    </header>
  );
}

export default Header;
