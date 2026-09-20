import React from 'react'
import LeadPieCharts from "echarts-for-react"; 

const ProjectWiseGraph = ({projectGraph}) => {

    console.log(projectGraph);

    let content = [];
    let contentValue = [];
        if(projectGraph == null){

        }else{
            projectGraph.map((edatax)=>{
                let proName = edatax.project_name;
                let proValue = edatax.total_count;
                content.push(`${proName}`);
                contentValue.push(`${proValue}`);
            });
        }
      

   const option = {
        xAxis: {
          data: content
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: contentValue
          }
        ]
      };

  return (
    <>
        <LeadPieCharts option={option} style={{height:'338px'}} />
    </>
  )
}

export default ProjectWiseGraph