import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const VirginLeadsAction = (agentId,page,limit,agentS,proid,teamObj) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}listvirginleads?agentid=${agentId}&teamObj=${teamObj}&orderby=id&ordertype=desc&page=${page}&perpage=${limit}&agentS=${agentS}&proid=${proid}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.VIRGIN_LEADS,
                payload:GetArray,
            }
        )

    }
}




