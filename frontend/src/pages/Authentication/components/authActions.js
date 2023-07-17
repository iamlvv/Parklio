import Swal from "sweetalert2";
import axios from "axios";
import {
  USER_AUTHENTICATION_API_URL,
  USER_REGISTRATION_API_URL,
} from "../../../constants/APIConstants";
import {
  INVALID_EMAIL_OR_PASSWORD,
  SOMETHING_WENT_WRONG,
  USER_ALREADY_EXISTED,
} from "../../../constants/errorConstants";

const Login = async ({ email, password, navigate }) => {
  try {
    const response = await axios.post(USER_AUTHENTICATION_API_URL, {
      email,
      password,
    });
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    navigate("/homepage");
  } catch (error) {
    if (error.response.status === 401) Swal.fire(INVALID_EMAIL_OR_PASSWORD);
  }
};

const SignUp = async ({ fullName, email, password, authority, navigate }) => {
  try {
    const response = await axios.post(USER_REGISTRATION_API_URL, {
      email,
      password,
      fullname: fullName,
      authority,
    });
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    navigate("/homepage");
  } catch (error) {
    if (error.response.status === 400) Swal.fire(USER_ALREADY_EXISTED);
    else Swal.fire(SOMETHING_WENT_WRONG);
  }
};
export { Login, SignUp };
