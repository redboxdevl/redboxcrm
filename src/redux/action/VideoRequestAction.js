import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const VideoRequestAction = (agentId,page,limit) =>{
    return async function (dispatch,getState){

        if(agentId == 'all'){ var cond = `?agentId=all&`; }else{ var cond = `?agentId=${agentId}&` }
        const response = await fetch(`${actionConfig.REACT_APP_URL}videorequest${cond}orderby=id&ordertype=desc&page=${page}&perpage=${limit}`);
        const dataxs = await response.json();
        const GetArray = dataxs;
        dispatch(
            {
                type:actionType.VIDEOFORMACTION,
                payload:GetArray,
            }
        )

    }
}
