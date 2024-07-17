import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import logoutIcon from "../../../public/imgs/logout-icon.png"

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
      <h1 className="groupTitle">Co-Lab</h1>
      <div className="rightsideHeader">
        <div className="authButtons">
          {Auth.loggedIn() ? (
            <div className="homeAndsettings">
              <div className="home-icon">
                <Link to="/">
                  <img src="./imgs/Home.png" alt="home" />
                </Link>
              </div>
              <div className="settings-icon">
                <Link to="/settings">
                  <img src="./imgs/settings.png" alt="settings" />
                </Link>
              </div>
              <div className='logout-btn'>
                <button
                  className="btn btn-lg btn-light"
                  onClick={logout}
                  style={{
                    backgroundImage: `url(${logoutIcon})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '25px',
                    height: '25px',
                    border: 'none',
                    padding: '0',
                    overflow: 'hidden',
                  }}>
                </button>
              </div>
            </div>
          ) : (
            <div className='loginAndSignUp'>
              <div className="login-btn">
                <Link className="btn btn-lg btn-info" to="/login">
                  Login
                </Link>
              </div>
              <div className="signup-btn">
                <Link className="btn btn-lg btn-light" to="/signup">
                  Signup
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
