import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
      <header className="header">
            {Auth.loggedIn() ? (
        
              <>
                <div className="profilePic">
                  <img src="https://via.placeholder.com/150" alt="Group Logo" />
                </div>
                <h1 className="groupTitle">Co-Lab</h1>
                <div className="rightsideHeader">
                  <div className="authButtons">
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
                      <button className="btn btn-lg btn-light m-2" onClick={logout}>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
   
            ) : (
              <>
              <h1 className="groupTitle">Co-Lab</h1>
                <Link className="btn btn-lg btn-info m-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-lg btn-light m-2" to="/signup">
                  Signup
                </Link>
              </>
            )}
      </header>
    );
};

export default Header;
