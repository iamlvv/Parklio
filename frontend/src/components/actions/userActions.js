import axios from "axios";
import Swal from "sweetalert2";
import { SwalObject } from "../styles";
import { GET_USER_DETAILS_API_URL, UPDATE_USER_PROFILE_API_URL } from "../../constants/APIConstants";

const GetUserDetails = async ({
  userInfo,
  setFullName,
  setEmail,
  setAuthority,
}) => {
  try {
    const response = await axios.get(
      GET_USER_DETAILS_API_URL + `${userInfo.id}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setFullName(response.data.fullname);
    setEmail(response.data.email);
    setAuthority(response.data.authority);
  } catch (error) {
    console.log(error);
    Swal.fire({
      ...SwalObject.error,
    });
  }
};

const getUserName = async ({ userInfo, setName }) => {
  try {
    const response = await axios.get(
      GET_USER_DETAILS_API_URL + `${userInfo.id}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setName(response.data.fullname);
  } catch (error) {
    console.log(error);
  }
};

const UpdateUserProfile = async ({
  userInfo,
  fullName,
  email,
  currentPassword,
  newPassword,
}) => {
  try {
    const response = await axios.post(
      UPDATE_USER_PROFILE_API_URL + `${userInfo.id}`,
      {
        fullname: fullName,
        email: email,
        oldPassword: currentPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    Swal.fire({
      ...SwalObject.success,
      text: `Profile has been updated.`,
    });
  } catch (error) {
    console.log(error);
    Swal.fire({
      ...SwalObject.error,
    });
  }
};

export { GetUserDetails, UpdateUserProfile, getUserName };
