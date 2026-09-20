import React from 'react';
import LeadTransferLineChart from "echarts-for-react"; 

const ShareTransferLine = ({data}) => {

  let content = [];
  let format = [];
    let contentValueAssing = [];
    let contentValueMyLeads = [];
    let contentValueHotLeads = [];
    let contentValueNotinterLeads = [];
        if(data == null || data == ''){

        }else{
          data.data.map((edatax)=>{
                let DayName = edatax.format;
                let AssignValue = edatax.transferassignweekly;
                let MyLeadValue = edatax.transfermyleadsweekly;
                let HotLeadValue = edatax.transferhotleadsweekly;
                let NotInterLeadValue = edatax.transfernotinterestedleadsweekly;
                format.push(`${DayName}`);
                contentValueAssing.push(`${AssignValue}`);
                contentValueMyLeads.push(`${MyLeadValue}`);
                contentValueHotLeads.push(`${HotLeadValue}`);
                contentValueNotinterLeads.push(`${NotInterLeadValue}`);
            });
        }

    const option = {
        // title: {
        //   text: 'Stacked Line'
        // },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Hot', 'Intersted', 'Moderate', 'Not Intersted','Deal Done']
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
          data: format
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: 'Hot',
          type: 'line',
          stack: 'Total',
          data: contentValueHotLeads
        }, {
          name: 'Intersted',
          type: 'line',
          stack: 'Total',
          data: contentValueMyLeads
        }, {
          name: 'Assign',
          type: 'line',
          stack: 'Total',
          data: contentValueAssing
        }, {
          name: 'Not Intersted',
          type: 'line',
          stack: 'Total',
          data: contentValueNotinterLeads
        },{
          name: 'Deal Done',
          type: 'line',
          stack: 'Total',
          data: [0, 0, 0, 0, 0, 0, 0]
        }]
      };

  return (
    <>
        <LeadTransferLineChart option={option} style={{height:'300px'}} />
    </>
  )
}

export default ShareTransferLine