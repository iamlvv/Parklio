import React from "react";
import loginImage from "../../assets/img/login-img.png";
import { Link, useNavigate } from "react-router-dom";

const styles = {
  backgroundInputField: {
    backgroundColor: "#F2DCA1",
  },
  backgroundButton: {
    backgroundColor: "#E9C462",
    opacity: "0.8",
  },
  textColor: {
    color: "#E9C462",
  },
};
function LoginPage() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/homepage");
  };
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 text-center mt-10">
        <div>
          <h1 className="uppercase font-bold text-5xl">welcome to parklio</h1>
          <form className="mt-10" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Email"
                required
                style={styles.backgroundInputField}
                className="font-bold p-2 text-black rounded-xl"
              />
            </div>
            <div className="mt-10">
              <input
                type="password"
                placeholder="Password"
                required
                style={styles.backgroundInputField}
                className="font-bold p-2 text-black rounded-xl"
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
