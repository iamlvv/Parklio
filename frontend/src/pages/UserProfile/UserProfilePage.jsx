import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import { styles } from "../../components/styles";
import Swal from "sweetalert2";
import axios from "axios";

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
function UserProfilePage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [authority, setAuthority] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/";
    } else {
      GetUserDetails({ userInfo, setFullName, setEmail, setAuthority });
    }
  }, []);
  const handleChangeProfile = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "New password and confirm new password are not the same!",
      });
      return;
    }
    const inputData = {
      userInfo: userInfo,
      fullName: fullName,
      email: email,
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
    };
    UpdateUserProfile(inputData);
  };
  return (
    <div>
      <NavigationBar />
      <div style={styles.content}>
        <h1 className="font-bold text-3xl mt-5">Hello, {fullName}</h1>
        <h2>Account Type: {authority}</h2>
        <div className="text-center">
          <form
            className="flex flex-col gap-y-5"
            onSubmit={handleChangeProfile}
          >
            <div>
              <input
                type="text"
                placeholder="Name"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl drop-shadow-md"
                value={fullName || ""}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl drop-shadow-md"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Current Password"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl drop-shadow-md"
                value={currentPassword || ""}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="New Password"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl drop-shadow-md"
                value={newPassword || ""}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm New Password"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl drop-shadow-md"
                value={confirmNewPassword || ""}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="rounded-2xl p-4 font-bold hover:bg-yellow-500 transition bg-yellow-300 ease-in-out"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
