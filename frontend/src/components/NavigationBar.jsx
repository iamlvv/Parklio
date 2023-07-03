import React, { useEffect, useState } from "react";
import homeLogo from "../assets/img/home-logo.png";
import userLogo from "../assets/img/userProfile-logo.png";
import statisticsLogo from "../assets/img/statistics-logo.png";
import logoutLogo from "../assets/img/logout-logo.png";
import managementLogo from "../assets/img/management-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "./styles";
import axios from "axios";

const getUserDetails = async ({ userToken, setAuthority }) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/users/profile",
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    setAuthority(response.data.authority);
  } catch (error) {
    console.log(error);
  }
};

function NavigationBar() {
  const navigate = useNavigate();
  const [authority, setAuthority] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const activeLink = "bg-yellow-400";
  const inactiveLink = "bg-white";
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setAuthority(userInfo.authority);
    }
  }, []);

  const notAuthorizedManagement = <div></div>;
  const authorizedManagement = (
    <Link to={authority === "admin" ? "/management" : ""}>
      <div className="flex flex-col items-center hover:bg-yellow-400 rounded-xl py-5 transition ease-in-out">
        <img src={managementLogo} alt="Management" />
        <h1>Management</h1>
      </div>
    </Link>
  );

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <div
      className="flex flex-col gap-9 font-bold px-3 float-left z-40 fixed drop-shadow-lg"
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
      {authority ? authorizedManagement : notAuthorizedManagement}
      <div
        className="flex flex-col items-center hover:bg-yellow-400 rounded-xl py-5 transition ease-in-out cursor-pointer"
        onClick={handleLogout}
      >
        <img src={logoutLogo} alt="Logout" />
        <h1>Log out</h1>
      </div>
    </div>
  );
}

export default NavigationBar;
