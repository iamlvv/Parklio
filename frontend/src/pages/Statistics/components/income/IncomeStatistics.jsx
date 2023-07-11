import { AiOutlineQuestionCircle } from "react-icons/ai";
import { getGraphData } from "../../../../components/actions/incomeActions";
import Graph from "./Graph";
import React, { useEffect, useState } from "react";
import { styles } from "../../../../components/styles";

function IncomeStatistics({ typeOfTime, userInfo }) {
  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    getGraphData({ typeOfTime, setGraphData, userInfo });
  }, [typeOfTime]);

  return (
    <div className="">
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
