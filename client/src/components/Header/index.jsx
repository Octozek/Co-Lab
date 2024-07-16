import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="header">
      <div className="profilePic">
        <img src="https://via.placeholder.com/150" alt="Group Logo" />
      </div>
      <h1 className="groupTitle">Group Title</h1>
      <div className="rightsideHeader">
        <div className='homeAndsettings'>
        <div className="home-icon">
          <Link to="/Home">
          <img src='./imgs/Home.png' alt='home' />
          </Link>
        </div>
        <div className="settings-icon">
          <Link to="/settings">
            <img src='./imgs/settings.png' alt='settings' />
          </Link>
        </div>
        </div>
        <div className="authButtons">
          {Auth.loggedIn() ? (
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;


