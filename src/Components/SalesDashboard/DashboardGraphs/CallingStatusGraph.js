import React from 'react'
import CallingGraphsData from "echarts-for-react"; 
import CallingStatusSkeleton from '../Skeleton/CallingStatusSkeleton';

const CallingStatusGraph = ({dataCalling,loading,timeData}) => {

  let incommingWeekly = [];
  let dateFormat = [];
    let outgoingWeekly = [];
        // if(dataCalling === null || dataCalling === '' || dataCalling === undefined){
        // }else{
        //     dataCalling.map((edatax)=>{
        //         let dateFormatx = edatax.format;
        //         let weeklydata = edatax.incommingweekly;
        //         let weeklyOutgoingdata = edatax.outgoingweekly;
        //         // let callingValue = edatax.total_count;
        //         dateFormat.push(`${dateFormatx}`);
        //         incommingWeekly.push(`${weeklydata}`);
        //         outgoingWeekly.push(`${weeklyOutgoingdata}`);
        //     });
        // }


        if(timeData === null || timeData === '' || timeData === undefined){
        }else{
          timeData.map((edatax)=>{
                let dateFormatx = edatax.time;
                let weeklydata = edatax.zongCallingIncommingDataWeekly;
                let weeklyOutgoingdata = edatax.zongCallingOutgoingDataWeekly;
                // let callingValue = edatax.total_count;
                dateFormat.push(`${dateFormatx}`);
                incommingWeekly.push(`${weeklydata}`);
                outgoingWeekly.push(`${weeklyOutgoingdata}`);
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
        data: ['Incomming', 'Outgoing']
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
        title: "timeline",
        boundaryGap: false,
        data: dateFormat,
        // data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Incomming',
          type: 'line',
          stack: 'Total',
          data: incommingWeekly
        },
        {
          name: 'Outgoing',
          type: 'line',
          stack: 'Total',
          data: outgoingWeekly
        },
      ]
    };

  return (
    <>
    {
        loading && <CallingStatusSkeleton />
    }
      {loading === false ? <CallingGraphsData option={option} style={{height:'280px'}} /> : <></> }
    </>
  )
}

export default CallingStatusGraph