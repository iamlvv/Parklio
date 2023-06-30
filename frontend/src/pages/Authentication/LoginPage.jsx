import React, { useState } from "react";
import loginImage from "../../assets/img/login-img.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { styles } from "../../components/styles";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      navigate("/homepage");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 text-center mt-10">
        <div>
          <h1 className="uppercase font-bold text-5xl">welcome to parklio</h1>
          <form className="mt-10" onSubmit={handleLogin}>
            <div>
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
              <button
                type="submit"
                style={styles.backgroundButton}
                className="font-bold text-2xl p-2 rounded-xl hover:bg-ye"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-5">
            <h2>Newbie to our system?</h2>
            <Link to="/signup">
              <h2 style={styles.textColor} className="font-bold">
                Sign up
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

export default LoginPage;
