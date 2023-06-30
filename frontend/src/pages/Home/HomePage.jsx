import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import CheckInForm from "./components/CheckInForm";
import { styles } from "../../components/styles";
import CheckOutForm from "./components/CheckOutForm";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.fullname);
    }
  }, []);
  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <div style={styles.content}>
        <h1 className="font-bold text-3xl mt-5">Hello, {name || ""}</h1>
        <CheckInForm />
        <CheckOutForm />
      </div>
    </div>
  );
}

export default HomePage;
