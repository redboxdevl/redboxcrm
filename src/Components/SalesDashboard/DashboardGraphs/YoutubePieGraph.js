import React from 'react'
import LeadYoutubePieCharts from "echarts-for-react"; 

const YoutubePieGraph = () => {

    const option = {
        // title: {
        //   text: 'Referer of a Website',
        //   subtext: 'Fake Data',
        //   left: 'center'
        // },
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
            name: 'Publish'
          }, {
            value: 0,
            name: 'Shoot'
          }, {
            value: 0,
            name: 'Reject'
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
        <LeadYoutubePieCharts option={option} style={{height:'338px'}} />
    </>
  )
}

export default YoutubePieGraph