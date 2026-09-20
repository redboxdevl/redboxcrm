import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const TransferLeadsAction = (agentId,page,limit) =>{
    return async function (dispatch,getState){

        if(agentId == 'all'){ var cond = `?agentid=all&`; }else{ var cond = `?agentid=${agentId}&` }

        const response = await fetch(`${actionConfig.REACT_APP_URL}listransferleads${cond}orderby=id&ordertype=desc&page=${page}&perpage=${limit}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.TRANSFERLEADSACTION,
                payload:GetArray,
            }
        )

    }
}
