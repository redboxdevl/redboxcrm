import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const HotLeadsAction = (agentid,page,limit,teamObj,browserName,SalesConsul) =>{

    return async function(dispatch,getState){

        if(agentid == 'all'){ var cond = `?agentid=all&teamObj=${teamObj}&browserName=${browserName}&SalesConsul=${SalesConsul}&`; }else{ var cond = `?agentid=${agentid}&browserName=${browserName}&SalesConsul=${SalesConsul}&` }
        const response = await fetch(`${actionConfig.REACT_APP_URL}listhotleads${cond}orderby=id&ordertype=desc&page=${page}&perpage=${limit}`);
        const dataxs = await response.json();
        const finalDataMy = dataxs;
        dispatch(
            {
                type:actionType.HOTLEADS,
                payload:finalDataMy,
            }
        )

    }
    
}
