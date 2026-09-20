import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const ActivitiesAction = (agentId,page,limit,teamObj) =>{
    return async function (dispatch,getState){
        
        if(agentId == 'all'){ var cond = `?agentid=all&teamObj=${teamObj}&`; }else{ var cond = `?agentid=${agentId}&` }
        const response = await fetch(`${actionConfig.REACT_APP_URL}listactivity${cond}orderby=id&ordertype=desc&page=${page}&perpage=${limit}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.ACTIVITIESLEADS,
                payload:GetArray,
            }
        )

    }
}




