import React from "react";

function VehicleStatistics({ typeOfStatistics, typeOfTime }) {
  return (
    <div>
      <table>
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
      </table>
    </div>
  );
}

function ServiceStatistics({ typeOfStatistics, typeOfTime }) {
  return (
    <div>
      <table>
        <tr>
          <th>Plate Number</th>
          <th>Owner's name</th>
          <th>Vehicle Type</th>
          <th>Register Time</th>
          <th>Cost</th>
        </tr>
      </table>
    </div>
  );
}
function IncomeStatistics({ typeOfStatistics, typeOfTime }) {
  return <div>hello World</div>;
}

function StatisticsContent({ typeOfStatistics, typeOfTime }) {
  return (
    <div>
      {typeOfStatistics === "vehicle" ? (
        <VehicleStatistics
          typeOfStatisctics={typeOfStatistics}
          typeOfTime={typeOfTime}
        />
      ) : typeOfStatistics === "service" ? (
        <ServiceStatistics
          typeOfStatisctics={typeOfStatistics}
          typeOfTime={typeOfTime}
        />
      ) : (
        <IncomeStatistics
          typeOfStatisctics={typeOfStatistics}
          typeOfTime={typeOfTime}
        />
      )}
    </div>
  );
}

export default StatisticsContent;
