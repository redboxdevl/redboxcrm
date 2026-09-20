import React from 'react';
import ContentLineChart from "echarts-for-react"; 

const ContentWriterLineGraph = () => {

    const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Assigend', 'My Leads', 'Hot Leads', 'Not Intersted', 'Dormate', 'Activity']
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
          name: 'Assigend',
          type: 'line',
          stack: 'Total',
          data: [0, 0, 0, 0, 0, 0, 0]
        }, {
          name: 'My Leads',
          type: 'line',
          stack: 'Total',
          data: [0, 0, 0, 0, 0, 0, 0]
        }, {
          name: 'Hot Leads',
          type: 'line',
          stack: 'Total',
          data: [0, 0, 0, 0, 0, 0, 0]
        }, {
          name: 'Not Intersted',
          type: 'line',
          stack: 'Total',
          data: [0, 0, 0, 0, 0, 0, 0]
        }, {
          name: 'Dormate',
          type: 'line',
          stack: 'Total',
          data: [0, 0, 0, 0, 0, 0, 0]
        }, {
          name: 'Activity',
          type: 'line',
          stack: 'Total',
          data: [0, 0, 0, 0, 0, 0, 0]
        }]
      };

  return (
    <>
        <ContentLineChart option={option} style={{height:'300px'}} />
    </>
  )
}

export default ContentWriterLineGraph