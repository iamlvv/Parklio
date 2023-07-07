import React, { useState } from "react";
function Navigation({ handleTypeOfStatistics, handleTypeOfTime }) {
  const [typeOfStatistics, setTypeOfStatistics] = useState("vehicle");
  const [typeOfTime, setTypeOfTime] = useState("day");
  const activeStyle =
    "mb-10 rounded-2xl p-4 font-bold bg-black text-white transition border ease-in-out";
  const inactiveStyle =
    "mb-10 rounded-2xl p-4 font-bold hover:bg-black hover:text-white bg-white text-black transition border ease-in-out";

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
            typeOfStatistics === "vehicle" ? activeStyle : inactiveStyle
          }
          onClick={() => {
            adjustTypeOfStatistics("vehicle");
          }}
        >
          Vehicles
        </button>
        <button
          className={
            typeOfStatistics === "service" ? activeStyle : inactiveStyle
          }
          onClick={() => {
            adjustTypeOfStatistics("service");
          }}
        >
          Services
        </button>
        <button
          className={
            typeOfStatistics === "income" ? activeStyle : inactiveStyle
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
              className={typeOfTime === "day" ? activeStyle : inactiveStyle}
              onClick={() => {
                adjustTypeOfTime("day");
              }}
            >
              Day
            </button>
            <button
              className={typeOfTime === "month" ? activeStyle : inactiveStyle}
              onClick={() => {
                adjustTypeOfTime("month");
              }}
            >
              Month
            </button>
            <button
              className={typeOfTime === "year" ? activeStyle : inactiveStyle}
              onClick={() => {
                adjustTypeOfTime("year");
              }}
            >
              Year
            </button>
            <button
              className={typeOfTime === "today" ? activeStyle : inactiveStyle}
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
