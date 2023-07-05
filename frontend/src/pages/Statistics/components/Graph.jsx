import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Graph({ data }) {
  return (
    <div>
      <BarChart
        width={1024}
        height={500}
        data={data}
        // margin={{
        //   top: 5,
        //   right: 30,
        //   left: 20,
        //   bottom: 5,
        // }}
        className="mx-auto"
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="income"
          fill="#a16207"
          background={{ fill: "#eee" }}
          unit="$"
        />
      </BarChart>
    </div>
  );
}

export default Graph;
