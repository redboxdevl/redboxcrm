import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const AssignLeadsAction = (agentId,page,limit,search,nature,salesId,transferStatus,teamObj,ProjectN,company_id) =>{

    return async function(dispatch,getState){
        if(agentId == 'all'){ var cond = `?agentid=all&teamObj=${teamObj}&company_id=${company_id}&`; }else{ var cond = `?agentid=${agentId}&company_id=${company_id}&` }
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}listassignleads${cond}orderby=created_at&ordertype=desc&page=${page}&perpage=${limit}&q=${search}&nature=${nature}&salesId=${salesId}&transferStatus=${transferStatus}&ProjectN=${ProjectN}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        // const response = await fetch(`${actionConfig.REACT_APP_URL}listassignleads${cond}orderby=publishAgentDate&ordertype=desc&page=${page}&perpage=${limit}&search=${search}`);
        // const dataxs = await response.json();
        
        dispatch(
            {
                type:actionType.ASSIGN_LEADS,
                payload:response,
            }
        )

    }
    
}
