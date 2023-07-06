import Swal from "sweetalert2";
import axios from "axios";

const Login = async ({ email, password, navigate }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    navigate("/homepage");
  } catch (error) {
    console.log(error.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};

const SignUp = async ({ fullName, email, password, authority, navigate }) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/signup",
      {
        email,
        password,
        fullname: fullName,
        authority,
      }
    );
    console.log(response.data);
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    navigate("/homepage");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};
export { Login, SignUp };
