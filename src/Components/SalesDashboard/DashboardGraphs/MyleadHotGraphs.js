import React from 'react'
import LeadPieCharts from "echarts-for-react"; 

const MyleadHotGraphs = ({data}) => {

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
            name: 'Assign Leads'
          }, {
            value: 0,
            name: 'Metting Align'
          }, {
            value: 0,
            name: 'Not Interested'
          }, {
            value: 0,
            name: 'Metting Done'
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

export default MyleadHotGraphs