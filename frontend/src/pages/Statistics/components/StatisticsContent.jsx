import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GetAllVehicles = async ({ userInfo }) => {
  try {
    const response = await axios.get("http://localhost:5000/api/vehicles", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
function VehicleStatistics({ typeOfStatistics, typeOfTime, userInfo }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>Owner's name</th>
            <th>Vehicle Type</th>
            <th>Check In Time</th>
            <th>Check Out Time</th>
            <th>Type of parking</th>
            <th>Additional service</th>
            <th>Cost</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

function ServiceStatistics({ typeOfStatistics, typeOfTime, userInfo }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>Owner's name</th>
            <th>Vehicle Type</th>
            <th>Register Time</th>
            <th>Cost</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
function IncomeStatistics({ typeOfStatistics, typeOfTime, userInfo }) {
  return <div>hello World</div>;
}

function StatisticsContent({ typeOfStatistics, typeOfTime }) {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      {typeOfStatistics === "vehicle" ? (
        <VehicleStatistics
          typeOfStatisctics={typeOfStatistics}
          typeOfTime={typeOfTime}
          userInfo={userInfo}
        />
      ) : typeOfStatistics === "service" ? (
        <ServiceStatistics
          typeOfStatisctics={typeOfStatistics}
          typeOfTime={typeOfTime}
          userInfo={userInfo}
        />
      ) : (
        <IncomeStatistics
          typeOfStatisctics={typeOfStatistics}
          typeOfTime={typeOfTime}
          userInfo={userInfo}
        />
      )}
    </div>
  );
}

export default StatisticsContent;
