import React from 'react'
import LeadPieCharts from "echarts-for-react"; 

const TestPie4 = ({data}) => {

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
            value: 100,
            name: 'Total Leads'
          }, {
            value: 6,
            name: 'Mobile Switched Off'
          }, {
            value: 2,
            name: 'Not Reachable'
          }, {
            value: 5,
            name: 'Mistakenly Applied'
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

export default TestPie4