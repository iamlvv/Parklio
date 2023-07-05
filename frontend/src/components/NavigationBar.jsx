import React, { useEffect, useState } from "react";
import homeLogo from "../assets/img/home-logo.png";
import userLogo from "../assets/img/userProfile-logo.png";
import statisticsLogo from "../assets/img/statistics-logo.png";
import logoutLogo from "../assets/img/logout-logo.png";
import managementLogo from "../assets/img/management-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "./styles";
import axios from "axios";

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
      <div className="flex flex-row text-center gap-x-3 items-center hover:bg-gray-50 rounded-md py-5 transition ease-in-out">
        <img src={managementLogo} alt="Management" width={30} height={30} />
        <h1>Management</h1>
      </div>
    </Link>
  );

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <div>
      <div
        className="flex flex-col font-bold float-left z-40 fixed rounded-sm"
        style={styles.navigationWidth}
      >
        <Link to="/homepage" className="">
          <div className="flex flex-row text-center gap-x-3 items-center hover:bg-gray-100 rounded-md py-5 transition ease-in-out">
            <img src={homeLogo} alt="Home" width={30} height={30} />
            <h1>Home</h1>
          </div>
        </Link>
        <Link to="/statistics">
          <div className="flex flex-row text-center gap-x-3 items-center hover:bg-gray-100 rounded-md py-5 transition ease-in-out">
            <img src={statisticsLogo} alt="Statistics" width={30} height={30} />
            <h1>Statistics</h1>
          </div>
        </Link>
        <Link to="/userprofile">
          <div className="flex flex-row text-center gap-x-3 items-center hover:bg-gray-100 rounded-md py-5 transition ease-in-out">
            <img src={userLogo} alt="User Profile" width={30} height={30} />
            <h1>User Profile</h1>
          </div>
        </Link>
        {authority ? authorizedManagement : notAuthorizedManagement}
      </div>
    </div>
  );
}

export default NavigationBar;
