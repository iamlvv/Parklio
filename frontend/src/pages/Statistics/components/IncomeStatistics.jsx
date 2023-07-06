import Graph from "./Graph";
import {
  IncomeDaily,
  IncomeMonthly,
  IncomeToday,
  IncomeYearly,
} from "./IncomeCalculations";
import React, { useEffect, useState } from "react";
import axios from "axios";

function IncomeStatistics({ typeOfStatistics, typeOfTime, userInfo }) {
  const [graphData, setGraphData] = useState([]);
  const handleClick = async (typeOfTime) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/vehicles/checkedout`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    let incomeList = response.data;
    if (typeOfTime === "month") {
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      setGraphData(IncomeMonthly({ incomeList, month, year }));
    } else if (typeOfTime === "year") {
      let year = new Date().getFullYear();
      setGraphData(IncomeYearly({ incomeList, year }));
    } else if (typeOfTime === "day") {
      setGraphData(IncomeDaily({ incomeList }));
    } else if (typeOfTime === "today") {
      let today = {
        day: new Date().getUTCDate(),
        month: new Date().getUTCMonth() + 1,
        year: new Date().getUTCFullYear(),
      };
      setGraphData(IncomeToday({ incomeList, today }));
    }
  };
  useEffect(() => {
    handleClick(typeOfTime);
  }, [typeOfTime]);
  return (
    <div className="">
      <div className="mb-5">
        <h1 className="font-bold text-xl">What are these numbers?</h1>
        {typeOfTime === "day" ? (
          <p>
            The chart below illustrates the income of the car park daily. We can
            know that at which time of the day the car park is the busiest.
          </p>
        ) : typeOfTime === "month" ? (
          <p>
            The chart below illustrates the income of the car park monthly. We
            can know that at which time of the month the car park is the
            busiest.
          </p>
        ) : typeOfTime === "year" ? (
          <p>
            The chart below illustrates the income of the car park yearly. We
            can know that at which time of the year the car park is the busiest.
          </p>
        ) : (
          <p>
            The chart below illustrates the income of the car park today. We can
            know that at which time of the day the car park is the busiest.
          </p>
        )}
      </div>
      <div>
        {graphData.length !== 0 ? (
          <div className="mx-auto">
            <Graph data={graphData} />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default IncomeStatistics;
