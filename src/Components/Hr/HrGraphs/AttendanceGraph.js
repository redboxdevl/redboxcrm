import React from 'react'
import AttendanceGraphsData from "echarts-for-react"; 

const AttendanceGraph = () => {

    const option = {
        // title: {
        //   text: 'Stacked Line'
        // },
        tooltip: {
        trigger: 'axis'
        },
        legend: {
        data: ['Present', 'Absent', 'Late', 'Half Day', 'Leave']
        },
        grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
        },
        toolbox: {
        feature: {
        saveAsImage: {}
        }
        },
        xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
        type: 'value'
        },
        series: [{
        name: 'Presnet',
        type: 'line',
        stack: 'Total',
        data: [0, 0, 0, 0, 0, 0, 0]
        }, {
        name: 'Absent',
        type: 'line',
        stack: 'Total',
        data: [0, 0, 0, 0, 0, 0, 0]
        }, {
        name: 'Late',
        type: 'line',
        stack: 'Total',
        data: [0, 0, 0, 0, 0, 0, 0]
        }, {
        name: 'Half Day',
        type: 'line',
        stack: 'Total',
        data: [0, 0, 0, 0, 0, 0, 0]
        }, {
        name: 'Leave',
        type: 'line',
        stack: 'Total',
        data: [0, 0, 0, 0, 0, 0, 0]
        }]
        };

  return (
    <>
      <AttendanceGraphsData option={option} style={{height:'300px'}} />
    </>
  )
}

export default AttendanceGraph