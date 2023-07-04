import axios from "axios";
import Swal from "sweetalert2";

const GetUserDetails = async ({
  userInfo,
  setFullName,
  setEmail,
  setAuthority,
}) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/users/profile",
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
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};

const getUserName = async ({ userInfo, setName }) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/users/profile",
      {
        id: userInfo.id,
      },
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
      "http://localhost:5000/api/users/profile",
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
    console.log(response.data);
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Your profile has been updated.",
    });
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};

export { GetUserDetails, UpdateUserProfile, getUserName };
