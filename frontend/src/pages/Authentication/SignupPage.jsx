import React, { useState } from "react";
import loginImage from "../../assets/img/login-img.png";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "../../components/styles";
import axios from "axios";
import Swal from "sweetalert2";
import { SignUp } from "./components/authActions";

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authority, setAuthority] = useState("officer");
  const handleSignup = async (e) => {
    e.preventDefault();
    SignUp({ fullName, email, password, authority, navigate });
  };
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 text-center mt-10">
        <div>
          <h1 className="uppercase font-bold text-5xl">welcome to parklio</h1>
          <form className="mt-10" onSubmit={handleSignup}>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                required
                style={styles.backgroundInputField}
                className="font-bold p-2 text-black rounded-xl"
                value={fullName || ""}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mt-10">
              <input
                type="text"
                placeholder="Email"
                required
                style={styles.backgroundInputField}
                className="font-bold p-2 text-black rounded-xl"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-10">
              <input
                type="password"
                placeholder="Password"
                required
                style={styles.backgroundInputField}
                className="font-bold p-2 text-black rounded-xl"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-10">
              <input
                type="password"
                placeholder="Confirm Password"
                required
                style={styles.backgroundInputField}
                className="font-bold p-2 text-black rounded-xl"
                value={confirmPassword || ""}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                style={styles.backgroundButton}
                className="font-bold text-2xl p-2 rounded-xl hover:bg-ye"
              >
                SIGN UP
              </button>
            </div>
          </form>
          <div className="mt-5">
            <h2>Already had your account?</h2>
            <Link to="/">
              <h2 style={styles.textColor} className="font-bold">
                Log in
              </h2>
            </Link>
          </div>
        </div>
      </div>
      <div className="">
        <img src={loginImage} alt="Login" className="" />
      </div>
    </div>
  );
}

export default SignupPage;
