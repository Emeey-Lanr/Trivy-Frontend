import Chart from "react-apexcharts";
import { useContext, useEffect, useState } from "react";
import { dashboardContext } from "./AdminDashboard";
import { appContext } from "../App";
const DashBoardChart = () => {
  const { topThree, topThreeName } = useContext(appContext);


  return (
    <Chart
      options={  {
        chart: {
          background: "#fafafa",
          foreColor: "",
        },
        xaxis: {
          categories:topThreeName.filter((_, id)=>id < 3),
        },
        plotOptions: {
          bar: {
            horizonatal: true,
          },
        },
        fill: {
          colors: ["#03a26c"],
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: "Top Three",
          align: "center",
          margin: 20,
        },
      }}
      series={[
        {
          name: "Top Three",
          data: topThree.filter((_,id)=>id < 3),
        }
      ]}
      type="bar"
      height="700"
      width="100%"
    />
  );
};

export default DashBoardChart;
