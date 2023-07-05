import React, { useState } from "react";
import { styles } from "../../../components/styles";
function Navigation({ handleTypeOfStatistics, handleTypeOfTime }) {
  const [typeOfStatisctics, setTypeOfStatistics] = useState("vehicle");
  const [typeOfTime, setTypeOfTime] = useState("month");
  const activeStyle =
    "mb-10 rounded-2xl p-4 font-bold bg-black text-white transition border ease-in-out";
  const inactiveStyle =
    "mb-10 rounded-2xl p-4 font-bold hover:bg-black hover:text-white bg-white text-black transition border ease-in-out";
  return (
    <div>
      <div className="grid grid-cols-3 gap-9 mx-20 my-10">
        <button
          className={
            typeOfStatisctics === "vehicle" ? activeStyle : inactiveStyle
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
            typeOfStatisctics === "service" ? activeStyle : inactiveStyle
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
            typeOfStatisctics === "income" ? activeStyle : inactiveStyle
          }
          onClick={() => {
            handleTypeOfStatistics("income");
            setTypeOfStatistics("income");
          }}
        >
          Income
        </button>
      </div>
      <div className="grid grid-cols-3 mr-10">
        <div></div>
        <div></div>
        <div className="grid grid-cols-3 gap-9">
          {/* <button
            className="mb-10 rounded-2xl p-4 font-bold hover:bg-yellow-400 transition bg-yellow-200 ease-in-out"
            onClick={() => handleTypeOfTime("day")}
          >
            Day
          </button> */}
          <div></div>
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
        </div>
      </div>
    </div>
  );
}

export default Navigation;
