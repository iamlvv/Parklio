import React from "react";
import { styles } from "../../../components/styles";
function Navigation({ handleTypeOfStatistics, handleTypeOfTime }) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-9">
        <button
          className="mb-10 rounded-2xl p-4 font-bold hover:bg-yellow-500 transition bg-yellow-300 ease-in-out"
          onClick={() => handleTypeOfStatistics("vehicle")}
        >
          Vehicles
        </button>
        <button
          className="mb-10 rounded-2xl p-4 font-bold hover:bg-yellow-500 transition bg-yellow-300 ease-in-out"
          onClick={() => handleTypeOfStatistics("service")}
        >
          Services
        </button>
        <button
          className="mb-10 rounded-2xl p-4 font-bold hover:bg-yellow-500 transition bg-yellow-300 ease-in-out"
          onClick={() => handleTypeOfStatistics("income")}
        >
          Income
        </button>
      </div>
      <div className="grid grid-cols-3 gap-9">
        <button
          className="mb-10 rounded-2xl p-4 font-bold hover:bg-yellow-400 transition bg-yellow-200 ease-in-out"
          onClick={() => handleTypeOfTime("day")}
        >
          Day
        </button>
        <button
          className="mb-10 rounded-2xl p-4 font-bold hover:bg-yellow-400 transition bg-yellow-200 ease-in-out"
          onClick={() => handleTypeOfTime("month")}
        >
          Month
        </button>
        <button
          className="mb-10 rounded-2xl p-4 font-bold hover:bg-yellow-400 transition bg-yellow-200 ease-in-out"
          onClick={() => handleTypeOfTime("year")}
        >
          Year
        </button>
      </div>
    </div>
  );
}

export default Navigation;
