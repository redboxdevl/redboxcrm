import React from 'react'
import VirginGraphsData from "echarts-for-react"; 
import VirginLeadsSkeleton from '../Skeleton/VirginLeadsSkeleton';

const VirginGraphs = ({dataGraph,loading}) => {

    let content = [];
    let contentValue = [];
    // let contentColor = [];
        if(dataGraph === null || dataGraph === '' || dataGraph === undefined){
        }else{
            dataGraph.map((edatax)=>{
                let proName = edatax.clientProject;
                let proValue = edatax.total_count;
                content.push(`${proName}`);
                contentValue.push(`${proValue}`);
            });
        }
      
const option = {
   
    tooltip: {
        trigger: 'axis',
        axisPointer: {
        type: 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: content,
        axisTick: {
        alignWithLabel: true
        }
    }],
    yAxis: [{
        type: 'value'
    }],
    series: [{
        type: 'bar',
        barWidth: '90%',
        data: contentValue,
        itemStyle: {
            color: 'rgba(80,145,205,1)',
          }
    }],
    };

    console.log("loading",loading);

  return (
    <>
    {
        loading && <VirginLeadsSkeleton />
    }
    {
        loading == false ? <VirginGraphsData option={option} style={{height:'319px'}} /> : <></>
    }
    </>
  )
}

export default VirginGraphs