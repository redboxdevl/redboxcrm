import React from "react";
import LeadPieCharts from "echarts-for-react";

const CallingTypeSource = ({ data }) => {
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
            name: "Youtube",
          },
          {
            value: 0,
            name: "Social Media",
          },
          {
            value: 0,
            name: "Sms",
          },
          {
            value: 0,
            name: "Web",
          },
          {
            value: 0,
            name: "Reference",
          },
          {
            value: 0,
            name: "Follow Up",
          },
          {
            value: 0,
            name: "Personal Calls",
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

export default CallingTypeSource;
