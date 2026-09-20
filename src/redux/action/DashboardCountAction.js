import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"
import axios from 'axios';

export const getDashCountData = (agentId,teamObj,search,StartDates,EndDate) =>{

return async function (dispatch,getState){
 if(agentId == 'all'){ var cond = `?agentId=all&teamObj=${teamObj}&q=${search}&start=${StartDates}&end=${EndDate}`; }else{ var cond = `?agentId=${agentId}&q=${search}&start=${StartDates}&end=${EndDate}` }
 const CancelToken = axios.CancelToken;
 const source = CancelToken.source();
 
  const response = await axios(`${actionConfig.REACT_APP_URL}listdashboardcount${cond}`,{cancelToken: source.token}).then((res)=>{
     return res.data.data;
  }).catch((thrown) => {
     return thrown;
  });
// const response = await fetch(`${actionConfig.REACT_APP_URL}listdashboardcount${cond}`);
// const dataxs = await response.json();
// const finalData = dataxs.data;

dispatch(
{
    type:actionType.DASHBOARD_COUNT,
    payload:response,
}
)

}

}

export function loadingToggleAction (status){
   return {
       type:actionType.LOADINGTOGGLEACTION,
       payload:status
   }
}

// export const setDashCount = (DashCount) =>{
//     return{
//         type:actionType.DASHBOARD_COUNT,
//         payload:DashCount,
//     }
// }