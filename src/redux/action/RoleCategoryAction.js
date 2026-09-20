import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const RoleCategoryAction = (agentId,page,limit) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}rolecategory?agentId=${agentId}&orderby=id&ordertype=desc&page=${page}&perpage=${limit}`);
        const dataxs = await response.json();
        const GetArray = dataxs;
        dispatch(
            {
                type:actionType.ROLECATEGORYACTION,
                payload:GetArray,
            }
        )

    }
}