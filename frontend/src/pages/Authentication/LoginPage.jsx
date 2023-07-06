import React, { useEffect, useState } from "react";
import loginImage from "../../assets/img/login-img.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { styles } from "../../components/styles";
import { Login } from "./components/authActions";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (userInfo) navigate("/homepage");
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
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
                className="font-bold p-2 text-black rounded-xl border"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-10">
              <input
                type="password"
                placeholder="Password"
                required
                className="font-bold p-2 text-black rounded-xl border"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="font-bold text-2xl p-2 rounded-xl border border-black hover:bg-black hover:text-white transition ease-in-out"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-5">
            <h2>Newbie to our system?</h2>
            <button
              className="font-bold rounded-xl p-1 hover:text-white hover:bg-black transition ease-in-out text-gray-500"
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
