import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import Navigation from "./components/Navigation";
import { styles } from "../../components/styles";
import StatisticsContent from "./components/StatisticsContent";
import Header from "../../components/Header";
function StatisticsPage() {
  const [typeOfStatisctics, setTypeOfStatistics] = useState("vehicle");
  const [typeOfTime, setTypeOfTime] = useState("month");
  return (
    <div>
      <Header />
      <NavigationBar />
      <div style={styles.content}>
        <Navigation
          handleTypeOfStatistics={setTypeOfStatistics}
          handleTypeOfTime={setTypeOfTime}
        />
        <StatisticsContent
          typeOfStatistics={typeOfStatisctics}
          typeOfTime={typeOfTime}
        />
      </div>
    </div>
  );
}

export default StatisticsPage;
