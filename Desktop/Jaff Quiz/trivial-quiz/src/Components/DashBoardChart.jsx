import Chart from "react-apexcharts";
import { useContext, useEffect, useState } from "react";
import { dashboardContext } from "./AdminDashboard";
const DashBoardChart = () => {
  const { userRecords } = useContext(dashboardContext);
  const [topThree, setTopThree] = useState([])

  const [charDetails, setChartDetails] = useState({
    option: {
      chart: {
        background: "#fafafa",
        foreColor: "",
      },
      xaxis: {
        categories: topThree.map((content) => content.playerName),
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
        text: "Records",
        align: "center",
        margin: 20,
      },
    },
    series: [
      {
        name: "population",
        data: topThree.map((players) => players.totalScore),
      },
    ],
  });
  useEffect(() => {
    setTopThree(
    userRecords.filter((_, id)=> id < 3)
    )
    setChartDetails({
    option: {
      chart: {
        background: "#fafafa",
        foreColor: "",
      },
      xaxis: {
        categories: topThree.map((content) => content.playerName),
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
        text: "Records",
        align: "center",
        margin: 20,
      },
    },
    series: [
      {
        name: "population",
        data: topThree.map((players) => players.totalScore),
      },
    ],
  })

  },[])


  return (
    <Chart
      options={charDetails.option}
      series={charDetails.series}
      type="bar"
      height="700"
      width="100%"
    />
  );
};

export default DashBoardChart;
