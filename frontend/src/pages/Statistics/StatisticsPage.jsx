import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import Navigation from "./components/Navigation";
import { styles } from "../../components/styles";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import VehicleStatistics from "./components/vehicle/VehicleStatistics";
import ServiceStatistics from "./components/service/ServiceStatistics";
import IncomeStatistics from "./components/income/IncomeStatistics";

function StatisticsPage() {
  const [typeOfStatistics, setTypeOfStatistics] = useState("vehicle");
  const [typeOfTime, setTypeOfTime] = useState("day");
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, []);

  return (
    <div className="z-10 relative">
      <div className="">
        <Header />
      </div>
      <NavigationBar />
      <div style={styles.content}>
        <Navigation
          handleTypeOfStatistics={setTypeOfStatistics}
          handleTypeOfTime={setTypeOfTime}
        />
        <div>
          {typeOfStatistics === "vehicle" ? (
            <VehicleStatistics userInfo={userInfo} itemsPerPage={10} />
          ) : typeOfStatistics === "service" ? (
            <ServiceStatistics userInfo={userInfo} itemsPerPage={10} />
          ) : (
            <IncomeStatistics typeOfTime={typeOfTime} userInfo={userInfo} />
          )}
        </div>
      </div>
    </div>
  );
}
export default StatisticsPage;
