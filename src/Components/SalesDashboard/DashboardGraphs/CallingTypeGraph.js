import React, { useEffect, useState } from "react";
import LeadPieCharts from "echarts-for-react";
import { actionConfig } from "../../../configuration";

const CallingTypeGraph = () => {
  const [result, setResult] = useState([]);

  const ListCallingTypeG = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}callinggraphs`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setResult(await GetArray);
  };

  useEffect(() => {
    ListCallingTypeG();
  }, []);

  console.log("result", result);

  // const option = {
  //   tooltip: {
  //     trigger: "item",
  //   },
  //   legend: {
  //     orient: "vertical",
  //     left: "left",
  //   },
  //   series: [
  //     {
  //       name: "Leads",
  //       type: "pie",
  //       radius: "50%",
  //       data: [
  //         {
  //           value: 0,
  //           name: "Outgoing Calls",
  //         },
  //         {
  //           value: 0,
  //           name: "Incomming Calls",
  //         },
  //       ],
  //       emphasis: {
  //         itemStyle: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //           shadowColor: "rgba(0, 0, 0, 0.5)",
  //         },
  //       },
  //     },
  //   ],
  // };
  let AllEmpData = [];
  let AllYoutubeData = [];
  let AllSocialmediaData = [];
  let AllSmsData = [];
  let AllWebData = [];
  let AllReferenceData = [];
  let AllFollowupData = [];
  let AllPersonalCallsData = [];

  result?.map((edatax) => {
    console.log("edatax", edatax);
    let empDate = edatax.datetime;
    let empYoutubeDate = edatax.youtube;
    let empSocialmediaDate = edatax.socialmedia;
    let empSmsDate = edatax.sms;
    let empWebDate = edatax.web;
    let empReferenceDate = edatax.reference;
    let empFollowupDate = edatax.followup;
    let empPersonalCallsDate = edatax.personalCalls;
    AllEmpData.push(`${empDate}`);
    AllYoutubeData.push(`${empYoutubeDate}`);
    AllSocialmediaData.push(`${empSocialmediaDate}`);
    AllSmsData.push(`${empSmsDate}`);
    AllWebData.push(`${empWebDate}`);
    AllReferenceData.push(`${empReferenceDate}`);
    AllFollowupData.push(`${empFollowupDate}`);
    AllPersonalCallsData.push(`${empPersonalCallsDate}`);
  });

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: AllEmpData,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Youtube",
        type: "line",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: AllYoutubeData,
      },
      {
        name: "Social Media",
        type: "line",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: AllSocialmediaData,
      },
      {
        name: "Sms",
        type: "line",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: AllSmsData,
      },
      {
        name: "Web",
        type: "line",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: AllWebData,
      },
      {
        name: "Reference",
        type: "line",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: AllReferenceData,
      },
      {
        name: "Follow Up",
        type: "line",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: AllFollowupData,
      },
      {
        name: "Personal Calls",
        type: "line",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: AllPersonalCallsData,
      },
    ],
  };

  return (
    <>
      <LeadPieCharts option={option} style={{ height: "338px" }} />
    </>
  );
};

export default CallingTypeGraph;
