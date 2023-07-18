import React, { useEffect, useState } from "react";
import homeLogo from "../assets/img/home-logo.png";
import userLogo from "../assets/img/userProfile-logo.png";
import statisticsLogo from "../assets/img/statistics-logo.png";
import managementLogo from "../assets/img/management-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { styles } from "./styles";
import {
  ACTIVE_NAVIGATION_BAR_ITEM,
  INACTIVE_NAVIGATION_BAR_ITEM,
  NAVIGATION_BAR_ITEM,
} from "../constants/navigationConstants";

function NavigationBar() {
  const [authority, setAuthority] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in, if not, redirect to login page, if yes, check if user is admin, if yes, show management button
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
      className={({ isActive }) =>
        isActive ? ACTIVE_NAVIGATION_BAR_ITEM : INACTIVE_NAVIGATION_BAR_ITEM
      }
    >
      <div className={NAVIGATION_BAR_ITEM}>
        <img src={managementLogo} alt="Management" width={30} height={30} />
        <h1>Management</h1>
      </div>
    </NavLink>
  );

  return (
    <div>
      <div
        className="flex flex-col font-bold float-left rounded-sm"
        style={styles.navigationWidth}
      >
        <NavLink
          to="/homepage"
          className={({ isActive }) =>
            isActive ? ACTIVE_NAVIGATION_BAR_ITEM : INACTIVE_NAVIGATION_BAR_ITEM
          }
        >
          <div className={NAVIGATION_BAR_ITEM}>
            <img src={homeLogo} alt="Home" width={30} height={30} />
            <h1>Home</h1>
          </div>
        </NavLink>
        <NavLink
          to="/statistics"
          className={({ isActive }) =>
            isActive ? ACTIVE_NAVIGATION_BAR_ITEM : INACTIVE_NAVIGATION_BAR_ITEM
          }
        >
          <div className={NAVIGATION_BAR_ITEM}>
            <img src={statisticsLogo} alt="Statistics" width={30} height={30} />
            <h1>Statistics</h1>
          </div>
        </NavLink>
        <NavLink
          to="/userprofile"
          className={({ isActive }) =>
            isActive ? ACTIVE_NAVIGATION_BAR_ITEM : INACTIVE_NAVIGATION_BAR_ITEM
          }
        >
          <div className={NAVIGATION_BAR_ITEM}>
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
