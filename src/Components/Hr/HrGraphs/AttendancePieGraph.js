import React from 'react'
import AttendancePieGraphsData from "echarts-for-react"; 

const AttendancePieGraph = () => {

    const option = {
        tooltip: {
        trigger: 'item'
        },
        legend: {
        orient: 'vertical',
        left: 'left'
        },
        series: [{
        name: 'Leads',
        type: 'pie',
        radius: '50%',
        data: [{
        value: 0,
        name: 'Present'
        }, {
        value: 0,
        name: 'Absent'
        }, {
        value: 0,
        name: 'Late'
        }, {
        value: 0,
        name: 'Half Day'
        }, {
        value: 0,
        name: 'Leave'
        },],
        emphasis: {
        itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
        }
        }]
        };

  return (
    <>
      <AttendancePieGraphsData option={option} style={{height:'300px'}} />
    </>
  )
}

export default AttendancePieGraph