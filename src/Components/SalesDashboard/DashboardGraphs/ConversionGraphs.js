import React from 'react'
import LeadPieCharts from "echarts-for-react"; 

const ConversionGraphs = ({dataEmp}) => {


  let AllEmpData = [];
  let AllEmpATC = [];
  let thirtySecCalls = [];
  let nintySecCalls = [];
  let MettingAlign = [];
  let MettingDone = [];
  let SelfLeads = [];

  if(dataEmp === null || dataEmp === '' || dataEmp === undefined){
  }else{
      dataEmp.map((edatax)=>{
          let empData = edatax.emp_name;
          let AttemptedCalls = edatax.AttemptedCalls;
          let connectedCalls = edatax.connectedCalls;
          let VerifiedCalls = edatax.VerifiedCalls;
          let mettingAlligned = edatax.mettingAlligned;
          let mettingDone = edatax.mettingDone;
          let SelfLeadsdata = edatax.SelfLeadsdata;
          
          // let callingValue = edatax.total_count;
          AllEmpData.push(`${empData}`);
          AllEmpATC.push(AttemptedCalls);
          thirtySecCalls.push(connectedCalls);
          nintySecCalls.push(VerifiedCalls);
          MettingAlign.push(mettingAlligned);
          MettingDone.push(mettingDone);
          SelfLeads.push(SelfLeadsdata);
      });
  }

  console.log("AllEmpData",AllEmpATC);
    const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
            type: 'value',
        },
        yAxis: {
            type: 'value'
        },
        series: [
          {
            name: 'My Leads',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series'
            },
            data:[14]
          },
          {
            name: 'Metting Aligned',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [2]
          },
          {
            name: 'Metting Done',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [10]
          },
          {
            name: 'Deal Done',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [3]
          }
        ]
      };

  return (
    <>
        <LeadPieCharts option={option} style={{height:'348px'}} />
    </>
  )
}

export default ConversionGraphs