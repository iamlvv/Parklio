import React from "react";
import logo from "../assets/img/logo.png";
import instagramLogo from "../assets/img/instagram-logo.png";
import linkedinLogo from "../assets/img/linkedin-logo.png";
import { styles } from "./styles";
function Footer() {
  return (
    <div className="bg-gray-50 shadow-sm" style={styles.footer}>
      <div className="border-b pt-10 mx-10 mb-10"></div>
      <div className="flex flex-row justify-center items-center gap-x-20">
        <div>
          <img src={logo} alt="logo" width={200} height={100} />
        </div>
        <div className="flex flex-row gap-x-9">
          <h2>Home</h2>
          <h2>About Us</h2>
          <h2>Contact</h2>
          <h2>Terms</h2>
          <h2>Privacy</h2>
        </div>
        <div className="flex flex-row gap-x-9">
          <img src={instagramLogo} alt="instagram logo" />
          <img src={linkedinLogo} alt="linkedin logo" />
        </div>
      </div>
      <h2 className="text-center">&copy; Parklio. All Rights Reserved</h2>
    </div>
  );
}

export default Footer;
