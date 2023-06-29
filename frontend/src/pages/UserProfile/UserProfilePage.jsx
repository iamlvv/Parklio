import React from "react";
import NavigationBar from "../../components/NavigationBar";
import { styles } from "../../components/styles";
function UserProfilePage() {
  return (
    <div>
      <NavigationBar />
      <div style={styles.content}>
        <h1 className="font-bold text-3xl mt-5">Hello, John</h1>
        <h2>Account Type: Admin</h2>
        <div className="text-center">
          <form className="flex flex-col gap-y-5">
            <div>
              <input
                type="text"
                placeholder="Name"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Current Password"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="New Password"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm New Password"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl"
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
