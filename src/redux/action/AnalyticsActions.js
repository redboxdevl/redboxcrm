import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const AnalyticsActions = (agentId,page,limit) =>{

    return async function(dispatch,getState){
        if(agentId == 'all'){ var cond = `?agentId=all&`; }else{ var cond = `?agentId=${agentId}&` }
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}listanalytics${cond}orderBy=publishAgentDate&orderType=desc&page=${page}&perPage=${limit}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        dispatch(
            {
                type:actionType.ANALYTICSACTION,
                payload:response,
            }
        )

    }
    
}
