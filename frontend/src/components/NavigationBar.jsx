import React from "react";
import homeLogo from "../assets/img/home-logo.png";
import userLogo from "../assets/img/userProfile-logo.png";
import statisticsLogo from "../assets/img/statistics-logo.png";
import logoutLogo from "../assets/img/logout-logo.png";
import { Link } from "react-router-dom";

const styles = {
  navigationWidth: {
    width: "175px",
    top: "20%",
    position: "absolute",
  },
};
function NavigationBar() {
  return (
    <div
      className="flex flex-col gap-9 font-bold px-3 float-left z-40 fixed"
      style={styles.navigationWidth}
    >
      <Link to="/homepage">
        <div className="flex flex-col items-center hover:bg-yellow-400 rounded-xl py-5 transition ease-in-out">
          <img src={homeLogo} alt="Home" />
          <h1>Home</h1>
        </div>
      </Link>
      <Link to="/statistics">
        <div className="flex flex-col items-center hover:bg-yellow-400 rounded-xl py-5 transition ease-in-out">
          <img src={statisticsLogo} alt="Statistics" />
          <h1>Statistics</h1>
        </div>
      </Link>
      <Link to="/userprofile">
        <div className="flex flex-col items-center hover:bg-yellow-400 rounded-xl py-5 transition ease-in-out">
          <img src={userLogo} alt="User Profile" />
          <h1>User Profile</h1>
        </div>
      </Link>
      <Link to="/">
        <div className="flex flex-col items-center hover:bg-yellow-400 rounded-xl py-5 transition ease-in-out mt-20">
          <img src={logoutLogo} alt="Logout" />
          <h1>Log out</h1>
        </div>
      </Link>
    </div>
  );
}

export default NavigationBar;