import React from 'react'
import LeadPieCharts from "echarts-for-react"; 

const LeadPieChart = ({data}) => {

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
            value: data.assignleads,
            name: 'Assigend'
          }, {
            value: data.myleads,
            name: 'My Leads'
          }, {
            value: data.hotleads,
            name: 'Hot Leads'
          }, {
            value: data.notinterested,
            name: 'Not Intersted'
          }, {
            value: data.dormentleads,
            name: 'Dormate'
          }, {
            value: data.activity,
            name: 'Activity'
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
        <LeadPieCharts option={option} style={{height:'338px'}} />
    </>
  )
}

export default LeadPieChart