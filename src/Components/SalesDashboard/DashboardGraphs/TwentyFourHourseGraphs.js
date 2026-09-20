import React from 'react'
import LeadPieCharts from "echarts-for-react"; 

const TwentyFourHourseGraphs = ({data}) => {

    const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [{
          name: 'Follow up Call',
          type: 'pie',
          radius: '50%',
          data: [{
            value: 0,
            name: 'Metting in Office'
          }, {
            value: 0,
            name: 'Meeting Outside Office'
          }, {
            value: 0,
            name: 'Site Visit'
          }],
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
        <LeadPieCharts option={option} style={{height:'298px'}} />
    </>
  )
}

export default TwentyFourHourseGraphs