import React, { useState } from "react";
import { ACTIVE_NAVIGATION_ITEM_STATISTICS, INACTIVE_NAVIGATION_ITEM_STATISTICS } from "../../../constants/navigationConstants";

function Navigation({ handleTypeOfStatistics, handleTypeOfTime }) {
  const [typeOfStatistics, setTypeOfStatistics] = useState("vehicle");
  const [typeOfTime, setTypeOfTime] = useState("day");

  const adjustTypeOfStatistics = (type) => {
    handleTypeOfStatistics(type);
    setTypeOfStatistics(type);
  };
  const adjustTypeOfTime = (type) => {
    handleTypeOfTime(type);
    setTypeOfTime(type);
  };
  return (
    <div>
      <div className="grid grid-cols-3 gap-9 mx-20 my-10">
        <button
          className={
            typeOfStatistics === "vehicle" ? ACTIVE_NAVIGATION_ITEM_STATISTICS : INACTIVE_NAVIGATION_ITEM_STATISTICS
          }
          onClick={() => {
            adjustTypeOfStatistics("vehicle");
          }}
        >
          Vehicles
        </button>
        <button
          className={
            typeOfStatistics === "service" ? ACTIVE_NAVIGATION_ITEM_STATISTICS : INACTIVE_NAVIGATION_ITEM_STATISTICS
          }
          onClick={() => {
            adjustTypeOfStatistics("service");
          }}
        >
          Services
        </button>
        <button
          className={
            typeOfStatistics === "income" ? ACTIVE_NAVIGATION_ITEM_STATISTICS : INACTIVE_NAVIGATION_ITEM_STATISTICS
          }
          onClick={() => {
            adjustTypeOfStatistics("income");
          }}
        >
          Income
        </button>
      </div>
      {typeOfStatistics === "income" ? (
        <div className="grid grid-cols-3 mr-20">
          <div></div>
          <div></div>
          <div className="grid grid-cols-4 gap-9">
            <button
              className={typeOfTime === "day" ? ACTIVE_NAVIGATION_ITEM_STATISTICS : INACTIVE_NAVIGATION_ITEM_STATISTICS}
              onClick={() => {
                adjustTypeOfTime("day");
              }}
            >
              Day
            </button>
            <button
              className={typeOfTime === "month" ? ACTIVE_NAVIGATION_ITEM_STATISTICS : INACTIVE_NAVIGATION_ITEM_STATISTICS}
              onClick={() => {
                adjustTypeOfTime("month");
              }}
            >
              Month
            </button>
            <button
              className={typeOfTime === "year" ? ACTIVE_NAVIGATION_ITEM_STATISTICS : INACTIVE_NAVIGATION_ITEM_STATISTICS}
              onClick={() => {
                adjustTypeOfTime("year");
              }}
            >
              Year
            </button>
            <button
              className={typeOfTime === "today" ? ACTIVE_NAVIGATION_ITEM_STATISTICS : INACTIVE_NAVIGATION_ITEM_STATISTICS}
              onClick={() => {
                adjustTypeOfTime("today");
              }}
            >
              Today
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Navigation;
