import React from "react";
import LeadPieCharts from "echarts-for-react";

const Sourcegraphs = ({ data }) => {
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      left: "left",
    },
    series: [
      {
        name: "Leads",
        type: "pie",
        radius: "50%",
        data: [
          {
            value: 20,
            name: "Facebook",
          },
          {
            value: 4,
            name: "Youtube",
          },
          {
            value: 4,
            name: "Walking",
          },
          {
            value: 4,
            name: "Social Media",
          },
          {
            value: 4,
            name: "Incomming",
          },
          {
            value: 4,
            name: "Other",
          },
          {
            value: 4,
            name: "Instagram",
          },
          {
            value: 4,
            name: "Personal",
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
      <LeadPieCharts option={option} style={{ height: "380px" }} />
    </>
  );
};

export default Sourcegraphs;
