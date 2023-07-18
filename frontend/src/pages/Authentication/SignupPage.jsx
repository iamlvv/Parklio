import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../../components/styles";
import { SignUp } from "./components/authActions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  ACTIVE_NAVIGATION_BUTTON,
  ACTIVE_SUBMIT_FORM_BUTTON,
  INPUT_FIELD,
} from "../../constants/formConstants";
import Swal from "sweetalert2";
import {
  INVALID_EMAIL,
  PASSWORD_NOT_MATCH,
} from "../../constants/errorConstants";
import { EMAIL_PATTERN } from "../../constants/patternConstants";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in, navigate to homepage
    if (userInfo) navigate("/homepage");
  }, []);

  // Check if email is valid
  const isValidEmail = (email) => {
    return EMAIL_PATTERN.test(email);
  };
  const handleChangeEmail = (e) => {
    if (!isValidEmail(e.target.value)) {
      setErrorEmail("Invalid email");
    } else setErrorEmail(null);
    setEmail(e.target.value);
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire(PASSWORD_NOT_MATCH);
      return;
    }
    if (!isValidEmail(email)) {
      Swal.fire(INVALID_EMAIL);
      return;
    }
    SignUp({ fullName, email, password, authority: "officer", navigate });
  };

  return (
    <div className="">
      <Header />
      <div className="flex mt-14">
        <div style={styles.body} className="m-auto text-center">
          <h1 className="uppercase font-bold text-5xl">welcome to parklio</h1>
          <form className="mt-10" onSubmit={handleSignup}>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                required
                className={INPUT_FIELD}
                value={fullName || ""}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mt-5">
              <input
                type="text"
                placeholder="Email"
                required
                className={INPUT_FIELD}
                value={email || ""}
                onChange={handleChangeEmail}
              />
            </div>
            {errorEmail && <span className="text-red-500">{errorEmail}</span>}
            <div className="mt-5">
              <input
                type="password"
                placeholder="Password"
                required
                className={INPUT_FIELD}
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-5">
              <input
                type="password"
                placeholder="Confirm Password"
                required
                className={INPUT_FIELD}
                value={confirmPassword || ""}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mt-5">
              <button type="submit" className={ACTIVE_SUBMIT_FORM_BUTTON}>
                SIGN UP
              </button>
            </div>
          </form>
          <div className="mt-5">
            <h2>Already had your account?</h2>
            <button
              className={ACTIVE_NAVIGATION_BUTTON}
              onClick={() => navigate("/")}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignupPage;
