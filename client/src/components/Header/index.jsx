import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import logoutIcon from "../../../public/imgs/logout-icon.png";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="groupTitle">Co-Lab</h1>
        {Auth.loggedIn() ? (
          <>
            <div className="profilePic">
              <img src="https://via.placeholder.com/150" alt="Group Logo" />
            </div>
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
                </div>
                <button
                  className="btn btn-lg btn-light logout-btn"
                  onClick={logout}
                  style={{
                    backgroundImage: `url(${logoutIcon})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "25px",
                    height: "25px",
                    border: "none",
                    padding: "0",
                    overflow: "hidden",
                  }}
                ></button>
              </div>
            </div>
          </>
        ) : (
          <div className="login-signup">
            <Link className="btn btn-lg btn-info login-btn" to="/login">
              Login
            </Link>
            <Link className="btn btn-lg btn-light signup-btn" to="/signup">
              Signup
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
