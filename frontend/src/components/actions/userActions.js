import axios from "axios";
import Swal from "sweetalert2";
import { SwalObject } from "../styles";
import {
  GET_USER_DETAILS_API_URL,
  UPDATE_USER_PROFILE_API_URL,
} from "../../constants/APIConstants";
import {
  INVALID_PASSWORD,
  SOMETHING_WENT_WRONG,
  USER_NOT_FOUND,
} from "../../constants/errorConstants";

// Get user details
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
    if (error.response.status === 404) {
      Swal.fire(USER_NOT_FOUND);
    } else Swal.fire(SOMETHING_WENT_WRONG);
  }
};

// get only user's name
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
    if (error.response.status === 404) {
      Swal.fire(USER_NOT_FOUND);
    } else Swal.fire(SOMETHING_WENT_WRONG);
  }
};

// Update user profile
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
        email,
        oldPassword: currentPassword,
        newPassword,
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
    if (error.response.status === 401) {
      Swal.fire(INVALID_PASSWORD);
    } else if (error.response.status === 404) {
      Swal.fire({
        ...SwalObject.error,
        text: `User not found.`,
      });
    } else Swal.fire(SOMETHING_WENT_WRONG);
  }
};

export { GetUserDetails, UpdateUserProfile, getUserName };
