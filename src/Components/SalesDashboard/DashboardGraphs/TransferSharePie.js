import React from 'react'
import LeadTransferPieCharts from "echarts-for-react"; 

const TransferSharePie = ({data}) => {

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
            value: data.transferhotleads,
            name: 'Hot'
          }, {
            value: data.transfermyleads,
            name: 'Intersted'
          }, {
            value: data.transferAssign,
            name: 'Assign'
          }, {
            value: data.transfernotinterested,
            name: 'Not Intersted'
          },{
            value: 0,
            name: 'Deal Done'
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
        <LeadTransferPieCharts option={option} style={{height:'338px'}} />
    </>
  )
}

export default TransferSharePie