import { actionType } from "../types/types";

const singleTaskManagementCountstate = {
    singletaskmanagent:[],
}
export const TaskManagementreducers = (state = singleTaskManagementCountstate,action)=>{
    switch (action.type ) {
        case actionType.TASKMANAGEMENTACTION:
            return {
                ...state, //old state data
                singletaskmanagent:action.payload,// updated state data
            }
        default:
           return state;
    }

}