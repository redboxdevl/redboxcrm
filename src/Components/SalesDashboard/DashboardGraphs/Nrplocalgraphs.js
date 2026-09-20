import React from "react";
import LeadPieCharts from "echarts-for-react";

const Nrplocalgraphs = ({ data }) => {
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
            value: 20,
            name: "Overseas",
          },
          {
            value: 4,
            name: "Local",
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

export default Nrplocalgraphs;
