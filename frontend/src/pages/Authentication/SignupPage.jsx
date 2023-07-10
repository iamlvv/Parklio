import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../../components/styles";
import { SignUp } from "./components/authActions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { INPUT_FIELD } from "../../constants/formConstants";
import Swal from "sweetalert2";
import { PASSWORD_NOT_MATCH } from "../../constants/errorConstants";

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (userInfo) navigate("/homepage");
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire(PASSWORD_NOT_MATCH);
      return;
    }
    SignUp({ fullName, email, password, authority: "officer", navigate });
  };
  return (
    <div className="">
      <Header />
      <div className="flex mt-20">
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
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
              <button
                type="submit"
                className="font-bold text-2xl p-2 rounded-xl border border-black hover:bg-black hover:text-white transition ease-in-out"
              >
                SIGN UP
              </button>
            </div>
          </form>
          <div className="mt-5">
            <h2>Already had your account?</h2>
            <button
              className="font-bold rounded-xl p-1 hover:text-white hover:bg-black transition ease-in-out text-gray-500"
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
