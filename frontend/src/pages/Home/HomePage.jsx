import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import CheckInForm from "./components/CheckInForm";
import { styles } from "../../components/styles";
import CheckOutForm from "./components/CheckOutForm";
import { useNavigate } from "react-router-dom";
import { getUserName } from "../../components/actions/userActions";

function HomePage() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      getUserName({ userInfo, setName });
    }
  }, []);
  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <div style={styles.content}>
        <h1 className="font-bold text-3xl mt-5">Hello, {name || ""}</h1>
        <CheckInForm userInfo={userInfo} />
        <CheckOutForm userInfo={userInfo} />
      </div>
    </div>
  );
}

export default HomePage;
