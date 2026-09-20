import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const ListStatusReportAction = (agentId,teamObj,StartDates,EndDate) =>{

    return async function(dispatch,getState){
        
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const response = await axios(`${actionConfig.REACT_APP_URL}liststatusreports?agentId=${agentId}&teamObj=${teamObj}&StartDates=${StartDates}&EndDate=${EndDate}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((error) => {
            return error;
         });
     
        dispatch(
            {
                type:actionType.LISTSTATUSREPORTACTION,
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
