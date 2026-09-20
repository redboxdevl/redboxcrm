import React from "react";
import LeadPieCharts from "echarts-for-react";

const CallingTypeStatusGraphs = ({ data }) => {
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Leads",
        type: "pie",
        radius: "50%",
        data: [
          {
            value: 0,
            name: "Missed",
          },
          {
            value: 0,
            name: "Connected",
          },
          {
            value: 0,
            name: "Answered",
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <>
      <LeadPieCharts option={option} style={{ height: "338px" }} />
    </>
  );
};

export default CallingTypeStatusGraphs;
