import { getGraphData } from "../../../../components/actions/incomeActions";
import Graph from "./Graph";
import React, { useEffect, useState } from "react";

function IncomeStatistics({ typeOfTime, userInfo }) {
  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    getGraphData({ typeOfTime, setGraphData, userInfo });
  }, [typeOfTime]);

  return (
    <div className="">
      <div className="mb-5">
        <h1 className="font-bold text-xl">What are these numbers?</h1>
        <p>
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
        </p>
      </div>
      <div>
        {/* Illustration of the graph */}
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
