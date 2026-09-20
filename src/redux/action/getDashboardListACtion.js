import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const getDashboardListACtion = (agentId,teamObj,company_id) =>{

    return async function(dispatch,getState){
        
        const response = await fetch(`${actionConfig.REACT_APP_URL}listdashboardaction?agentId=${agentId}&teamObj=${teamObj}&company_id=${company_id}`);
        const dataxs = await response.json();
        const finalDataMy = dataxs;
        dispatch(
            {
                type:actionType.DASHBOARDLISTACTION,
                payload:finalDataMy,
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
