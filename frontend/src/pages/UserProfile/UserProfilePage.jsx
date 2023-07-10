import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import { SwalObject, styles } from "../../components/styles";
import {
  GetUserDetails,
  UpdateUserProfile,
} from "../../components/actions/userActions";
import Swal from "sweetalert2";
import Header from "../../components/Header";
import {
  ACTIVE_SUBMIT_FORM_BUTTON,
  INPUT_FIELD,
} from "../../constants/formConstants";

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
        ...SwalObject.error,
        text: "New password and confirm new password are not the same!",
      });
      return;
    }
    const inputData = {
      userInfo,
      fullName,
      email,
      currentPassword,
      newPassword,
      confirmNewPassword,
    };
    UpdateUserProfile(inputData);
  };
  return (
    <div>
      <Header />
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
                className={INPUT_FIELD}
                value={fullName || ""}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                className={INPUT_FIELD}
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Current Password"
                className={INPUT_FIELD}
                value={currentPassword || ""}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="New Password"
                className={INPUT_FIELD}
                value={newPassword || ""}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm New Password"
                className={INPUT_FIELD}
                value={confirmNewPassword || ""}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className={ACTIVE_SUBMIT_FORM_BUTTON}>
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
