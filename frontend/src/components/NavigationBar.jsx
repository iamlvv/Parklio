import React, { useEffect, useState } from "react";
import homeLogo from "../assets/img/home-logo.png";
import userLogo from "../assets/img/userProfile-logo.png";
import statisticsLogo from "../assets/img/statistics-logo.png";
import managementLogo from "../assets/img/management-logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { styles } from "./styles";

function NavigationBar() {
  const navigate = useNavigate();
  const [authority, setAuthority] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const activeLink = "bg-gray-200";
  const inactiveLink = "hover:bg-gray-100 transition ease-in-out";
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setAuthority(userInfo.authority);
    }
  }, []);

  const notAuthorizedManagement = <div></div>;
  const authorizedManagement = (
    <NavLink
      to={authority === "admin" ? "/management" : ""}
      className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
    >
      <div className="flex flex-row text-center gap-x-3 items-center hover:bg-gray-50 rounded-md py-5 transition ease-in-out pl-2">
        <img src={managementLogo} alt="Management" width={30} height={30} />
        <h1>Management</h1>
      </div>
    </NavLink>
  );
  return (
    <div className="z-40 fixed">
      <div
        className="flex flex-col font-bold float-left rounded-sm"
        style={styles.navigationWidth}
      >
        <NavLink
          to="/homepage"
          className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
        >
          <div className="flex flex-row text-center gap-x-3 items-center hover:bg-gray-100 rounded-md py-5 transition ease-in-out pl-2">
            <img src={homeLogo} alt="Home" width={30} height={30} />
            <h1>Home</h1>
          </div>
        </NavLink>
        <NavLink
          to="/statistics"
          className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
        >
          <div className="flex flex-row text-center gap-x-3 items-center hover:bg-gray-100 rounded-md py-5 transition ease-in-out pl-2">
            <img src={statisticsLogo} alt="Statistics" width={30} height={30} />
            <h1>Statistics</h1>
          </div>
        </NavLink>
        <NavLink
          to="/userprofile"
          className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
        >
          <div className="flex flex-row text-center gap-x-3 items-center hover:bg-gray-100 rounded-md py-5 transition ease-in-out pl-2">
            <img src={userLogo} alt="User Profile" width={30} height={30} />
            <h1>User Profile</h1>
          </div>
        </NavLink>
        {authority === "admin" ? authorizedManagement : notAuthorizedManagement}
      </div>
    </div>
  );
}

export default NavigationBar;
