import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const LeadStatusReportAction = (agentId,StartDates,EndDate) =>{

    return async function(dispatch,getState){
        
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const response = await axios(`${actionConfig.REACT_APP_URL}leadstatusreports?agentid=${agentId}&StartDates=${StartDates}&EndDate=${EndDate}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((error) => {
            return error;
         });
        // const response = await fetch(`${actionConfig.REACT_APP_URL}listformdata?agentid=${agentId}`);
        // const dataxs = await response.json();
        // const finalData = dataxs;
     
        dispatch(
            {
                type:actionType.LEADSTATUSREPORTACTION,
                payload:response,
            }
        )

    }
    
}
