import React from 'react'
import ContentWriterGraphsData from "echarts-for-react"; 

const ContentWriterGraph = () => {

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
            name: 'Youtube Description'
          }, {
            value: 0,
            name: 'Artical'
          }, {
            value: 0,
            name: 'Blog'
          }, {
            value: 0,
            name: 'Website Content'
          }, {
            value: 0,
            name: 'Other'
          }, {
            value: 0,
            name: 'Social Media'
          }, {
            value: 0,
            name: 'Markiting'
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
      <ContentWriterGraphsData option={option} style={{height:'300px'}} />
    </>
  )
}

export default ContentWriterGraph