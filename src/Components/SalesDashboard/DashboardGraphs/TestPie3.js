import React from 'react'
import LeadPieCharts from "echarts-for-react"; 

const TestPie3 = ({data}) => {

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
            value: 10,
            name: 'Haider Ali'
          }, {
            value: 6,
            name: 'Salman Ali'
          }, {
            value: 5,
            name: 'Farhan Khan'
          }, {
            value: 2,
            name: 'Khurram'
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

export default TestPie3