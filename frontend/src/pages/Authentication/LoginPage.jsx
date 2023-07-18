import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../../components/styles";
import { Login } from "./components/authActions";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {
  ACTIVE_NAVIGATION_BUTTON,
  ACTIVE_SUBMIT_FORM_BUTTON,
  INPUT_FIELD,
} from "../../constants/formConstants";
import { EMAIL_PATTERN } from "../../constants/patternConstants";
import Swal from "sweetalert2";
import { INVALID_EMAIL } from "../../constants/errorConstants";

function LoginPage() {
  const [errorEmail, setErrorEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      Swal.fire(INVALID_EMAIL);
      return;
    }
    Login({ email, password, navigate });
  };

  return (
    <div className="">
      <Header />
      <div className="flex mt-20">
        <div style={styles.body} className="m-auto text-center">
          <h1 className="uppercase font-bold text-5xl">welcome to parklio</h1>
          <form className="mt-10" onSubmit={handleLogin}>
            <div>
              <input
                type="text"
                placeholder="Email"
                required
                className={INPUT_FIELD}
                value={email || ""}
                onChange={handleChangeEmail}
              />
            </div>
            <div>
              {errorEmail && <h2 className="text-red-500">{errorEmail}</h2>}
            </div>
            <div className="mt-10">
              <input
                type="password"
                placeholder="Password"
                required
                className={INPUT_FIELD}
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-10">
              <button type="submit" className={ACTIVE_SUBMIT_FORM_BUTTON}>
                Login
              </button>
            </div>
          </form>
          <div className="mt-5">
            <h2>Newbie to our system?</h2>
            <button
              className={ACTIVE_NAVIGATION_BUTTON}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
