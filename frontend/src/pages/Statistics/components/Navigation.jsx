import React, { useState } from "react";
import { styles } from "../../../components/styles";
function Navigation({ handleTypeOfStatistics, handleTypeOfTime }) {
  const [typeOfStatistics, setTypeOfStatistics] = useState("vehicle");
  const [typeOfTime, setTypeOfTime] = useState("day");
  const activeStyle =
    "mb-10 rounded-2xl p-4 font-bold bg-black text-white transition border ease-in-out";
  const inactiveStyle =
    "mb-10 rounded-2xl p-4 font-bold hover:bg-black hover:text-white bg-white text-black transition border ease-in-out";
  return (
    <div>
      <div className="grid grid-cols-3 gap-9 mx-20 my-10">
        <button
          className={
            typeOfStatistics === "vehicle" ? activeStyle : inactiveStyle
          }
          onClick={() => {
            handleTypeOfStatistics("vehicle");
            setTypeOfStatistics("vehicle");
          }}
        >
          Vehicles
        </button>
        <button
          className={
            typeOfStatistics === "service" ? activeStyle : inactiveStyle
          }
          onClick={() => {
            handleTypeOfStatistics("service");
            setTypeOfStatistics("service");
          }}
        >
          Services
        </button>
        <button
          className={
            typeOfStatistics === "income" ? activeStyle : inactiveStyle
          }
          onClick={() => {
            handleTypeOfStatistics("income");
            setTypeOfStatistics("income");
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
                handleTypeOfTime("day");
                setTypeOfTime("day");
              }}
            >
              Day
            </button>
            <button
              className={typeOfTime === "month" ? activeStyle : inactiveStyle}
              onClick={() => {
                handleTypeOfTime("month");
                setTypeOfTime("month");
              }}
            >
              Month
            </button>
            <button
              className={typeOfTime === "year" ? activeStyle : inactiveStyle}
              onClick={() => {
                handleTypeOfTime("year");
                setTypeOfTime("year");
              }}
            >
              Year
            </button>
            <button
              className={typeOfTime === "today" ? activeStyle : inactiveStyle}
              onClick={() => {
                handleTypeOfTime("today");
                setTypeOfTime("today");
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
