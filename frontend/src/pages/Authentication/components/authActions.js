import Swal from "sweetalert2";
import axios from "axios";
import { SwalObject } from "../../../components/styles";
import { USER_AUTHENTICATION_API_URL, USER_REGISTRATION_API_URL } from "../../../constants/APIConstants";

const Login = async ({ email, password, navigate }) => {
  try {
    const response = await axios.post(
      USER_AUTHENTICATION_API_URL,
      {
        email,
        password,
      }
    );
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    navigate("/homepage");
  } catch (error) {
    console.log(error.message);
    Swal.fire({
      ...SwalObject.error,
    });
  }
};

const SignUp = async ({ fullName, email, password, authority, navigate }) => {
  try {
    const response = await axios.post(
      USER_REGISTRATION_API_URL,
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
      ...SwalObject.error,
    });
  }
};
export { Login, SignUp };
