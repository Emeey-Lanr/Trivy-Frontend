import Chart from "react-apexcharts";
import { useState } from "react";
const DashBoardChart = () => {
  const [ppp, setpp] = useState([
    { number: 20 },
    { number: 30 },
    { number: 40 },
  ]);
  const [playii, setplay] = useState();
  // ppp.map((ui, ud) => {
  //   setplay(ui)

  // })

  const [charDetails, setChartDetails] = useState({
    option: {
      chart: {
        background: "#fafafa",
        foreColor: "",
      },
      xaxis: {
        categories: ["Bayo", "kunle", "tunde"],
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
        data: ppp.map((ui, ud) => ui.number),
      },
    ],
  });

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
