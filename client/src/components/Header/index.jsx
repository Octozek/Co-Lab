import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

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
              <div className="aDivWithin">
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
              </div>
              <button className="btn btn-lg btn-light" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className='loginAndSignUp'>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
