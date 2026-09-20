import React from 'react';
import LeadLineChart from "echarts-for-react"; 

const LeadLineGraph = ({data}) => {

  console.log("leadline",data);

  let content = [];
  let format = [];
    let contentValueAssing = [];
    let contentValueMyLeads = [];
    let contentValueHotLeads = [];
    let contentValueNotinterLeads = [];
    let contentValueDormentLeads = [];
    let contentValueActivityLeads = [];
        if(data == null || data == ''){

        }else{
          data.assignleadweekly.map((edatax)=>{
                let DayName = edatax.format;
                let AssignValue = edatax.assignleadweekly;
                let MyLeadValue = edatax.myleadweekly;
                let HotLeadValue = edatax.hotleadweekly;
                let NotInterLeadValue = edatax.notinterestedweekly;
                let DormantLeadValue = edatax.dormentweekly;
                let ActivityLeadValue = edatax.activityweekly;
                format.push(`${DayName}`);
                contentValueAssing.push(`${AssignValue}`);
                contentValueMyLeads.push(`${MyLeadValue}`);
                contentValueHotLeads.push(`${HotLeadValue}`);
                contentValueNotinterLeads.push(`${NotInterLeadValue}`);
                contentValueDormentLeads.push(`${DormantLeadValue}`);
                contentValueActivityLeads.push(`${ActivityLeadValue}`);
            });
        }

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
          data: format
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: 'Assigend',
          type: 'line',
          stack: 'Total',
          data: contentValueAssing
        }, {
          name: 'My Leads',
          type: 'line',
          stack: 'Total',
          data: contentValueMyLeads
        }, {
          name: 'Hot Leads',
          type: 'line',
          stack: 'Total',
          data: contentValueHotLeads
        }, {
          name: 'Not Intersted',
          type: 'line',
          stack: 'Total',
          data: contentValueNotinterLeads
        }, {
          name: 'Dormate',
          type: 'line',
          stack: 'Total',
          data: contentValueDormentLeads
        }, {
          name: 'Activity',
          type: 'line',
          stack: 'Total',
          data: contentValueActivityLeads
        }]
      };

  return (
    <>
        <LeadLineChart option={option} style={{height:'300px'}} />
    </>
  )
}

export default LeadLineGraph