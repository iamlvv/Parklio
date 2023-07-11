import React, { useState } from "react";
import {
  ACTIVE_NAVIGATION_ITEM_STATISTICS,
  INACTIVE_NAVIGATION_ITEM_STATISTICS,
} from "../../../constants/navigationConstants";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { styles } from "../../../components/styles";

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
            typeOfStatistics === "vehicle"
              ? ACTIVE_NAVIGATION_ITEM_STATISTICS
              : INACTIVE_NAVIGATION_ITEM_STATISTICS
          }
          onClick={() => {
            adjustTypeOfStatistics("vehicle");
          }}
        >
          Vehicles
        </button>
        <button
          className={
            typeOfStatistics === "service"
              ? ACTIVE_NAVIGATION_ITEM_STATISTICS
              : INACTIVE_NAVIGATION_ITEM_STATISTICS
          }
          onClick={() => {
            adjustTypeOfStatistics("service");
          }}
        >
          Services
        </button>
        <button
          className={
            typeOfStatistics === "income"
              ? ACTIVE_NAVIGATION_ITEM_STATISTICS
              : INACTIVE_NAVIGATION_ITEM_STATISTICS
          }
          onClick={() => {
            adjustTypeOfStatistics("income");
          }}
        >
          Income
        </button>
      </div>
      {typeOfStatistics === "income" ? (
        <div className="flex flex-row justify-between mr-20 items-center">
          <div className="mb-5">
            <h1 className="font-bold text-2xl">Income Graph</h1>
            <div
              className="p-2 shadow-md bg-gray-50 rounded-md my-5"
              style={styles.infoBanner}
            >
              <ul>
                <li>
                  {" "}
                  <AiOutlineQuestionCircle className="inline-block mr-2" />
                  The chart below illustrates the income of the car park{" "}
                  {typeOfTime === "day"
                    ? "daily"
                    : typeOfTime === "month"
                    ? "monthly"
                    : typeOfTime === "year"
                    ? "yearly"
                    : "today"}
                  . We can know that at which time of the{" "}
                  {typeOfTime === "day"
                    ? "day"
                    : typeOfTime === "month"
                    ? "month"
                    : typeOfTime === "year"
                    ? "year"
                    : "today"}{" "}
                  the car park is the busiest.
                </li>
              </ul>
            </div>
          </div>
          <div></div>
          <div className="grid grid-cols-4 gap-9">
            <button
              className={
                typeOfTime === "day"
                  ? ACTIVE_NAVIGATION_ITEM_STATISTICS
                  : INACTIVE_NAVIGATION_ITEM_STATISTICS
              }
              onClick={() => {
                adjustTypeOfTime("day");
              }}
            >
              Day
            </button>
            <button
              className={
                typeOfTime === "month"
                  ? ACTIVE_NAVIGATION_ITEM_STATISTICS
                  : INACTIVE_NAVIGATION_ITEM_STATISTICS
              }
              onClick={() => {
                adjustTypeOfTime("month");
              }}
            >
              Month
            </button>
            <button
              className={
                typeOfTime === "year"
                  ? ACTIVE_NAVIGATION_ITEM_STATISTICS
                  : INACTIVE_NAVIGATION_ITEM_STATISTICS
              }
              onClick={() => {
                adjustTypeOfTime("year");
              }}
            >
              Year
            </button>
            <button
              className={
                typeOfTime === "today"
                  ? ACTIVE_NAVIGATION_ITEM_STATISTICS
                  : INACTIVE_NAVIGATION_ITEM_STATISTICS
              }
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
