import React, { useEffect, useState } from "react";
import logoutLogo from "../assets/img/logout-logo.png";
import logo from "../assets/img/logo.png";
import { styles } from "./styles";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Check if the user is logged in, if yes, show the logout button
  useEffect(() => {
    if (userInfo) {
      setLogout(true);
    }
  }, []);

  // Handle logout, remove the userInfo from localStorage and navigate to the login page
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <div className="z-40">
      <div
        className="flex justify-between items-center px-10 bg-gray-50 shadow-sm"
        style={styles.header}
      >
        <div>
          <img src={logo} alt="logo" width={100} height={50} />
        </div>
        <div>
          {logout ? (
            <div className="cursor-pointer hover:bg-red-500 transition ease-in-out rounded-md p-1">
              <img
                src={logoutLogo}
                alt="logout"
                width={30}
                height={30}
                onClick={handleLogout}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
