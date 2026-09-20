import React from "react";
import LeadPieCharts from "echarts-for-react";

const Professionsgraphs = ({ data }) => {
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
            name: "CEO",
          },
          {
            value: 4,
            name: "House Wife",
          },
          {
            value: 4,
            name: "Propert Owner",
          },
          {
            value: 4,
            name: "Private Job",
          },
          {
            value: 4,
            name: "Business Man",
          },
          {
            value: 4,
            name: "Doctor",
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

export default Professionsgraphs;
