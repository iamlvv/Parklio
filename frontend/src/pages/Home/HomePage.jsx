import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import CheckInForm from "./components/CheckInForm";
import { styles } from "../../components/styles";
import CheckOutForm from "./components/CheckOutForm";

function HomePage() {
  return (
    <div>
      <NavigationBar />
      <div style={styles.content}>
        <h1 className="font-bold text-3xl mt-5">Hello, John</h1>
        <CheckInForm />
        <CheckOutForm />
      </div>
    </div>
  );
}

export default HomePage;
