import React from 'react';
import LeadYoutubeLineChart from "echarts-for-react"; 

const YoutubeLineChart = () => {

    const option = {
        // title: {
        //   text: 'Stacked Line'
        // },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Reject', 'Shoot', 'Publish']
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
          name: 'Reject',
          type: 'line',
          stack: 'Total',
          data: [0, 0, 0, 0, 0, 0, 0]
        }, {
          name: 'Shoot',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310]
        }, {
          name: 'Publish',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410]
        }]
      };

  return (
    <>
        <LeadYoutubeLineChart option={option} style={{height:'300px'}} />
    </>
  )
}

export default YoutubeLineChart