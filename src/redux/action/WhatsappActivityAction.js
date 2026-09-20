import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const WhatsappActivityAction = (agentId,page,limit,search,nature,salesId,transferStatus) =>{

    return async function(dispatch,getState){
        if(agentId == 'all'){ var cond = `?agentid=all&`; }else{ var cond = `?agentid=${agentId}&` }
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}listwhatsappactivity${cond}orderby=publishAgentDate&ordertype=desc&page=${page}&perpage=${limit}&q=${search}&nature=${nature}&salesId=${salesId}&transferStatus=${transferStatus}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        // const response = await fetch(`${actionConfig.REACT_APP_URL}listassignleads${cond}orderby=publishAgentDate&ordertype=desc&page=${page}&perpage=${limit}&search=${search}`);
        // const dataxs = await response.json();
        
        dispatch(
            {
                type:actionType.WHATSAPPACTIVITIESACTION,
                payload:response,
            }
        )

    }
    
}
