import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const ReminderLeadsAction = (agentId,page,limit,teamObj,ReminderStatus,SalesConsul,ReminderPriority) =>{
    return async function (dispatch,getState){
        if(agentId == 'all'){ var cond = `?agentid=all&teamObj=${teamObj}&ReminderStatus=${ReminderStatus}&SalesConsul=${SalesConsul}&ReminderPriority=${ReminderPriority}&`; }else{ var cond = `?agentid=${agentId}&ReminderStatus=${ReminderStatus}&SalesConsul=${SalesConsul}&ReminderPriority=${ReminderPriority}&` }
      
        const response = await fetch(`${actionConfig.REACT_APP_URL}listreminders${cond}orderby=id&ordertype=desc&page=${page}&perpage=${limit}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data;
        const FinalArray = GetArray;
        dispatch(
            {
                type:actionType.REMINDERLEADS,
                payload:FinalArray,
            }
        )

    }
}




