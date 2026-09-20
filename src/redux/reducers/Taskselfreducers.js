import { actionType } from "../types/types";

const singleTaskManagementSelfCountstate = {
    singletaskmanagentself:[],
}
export const Taskselfreducers = (state = singleTaskManagementSelfCountstate,action)=>{
    switch (action.type ) {
        case actionType.TASKMANAGEMENTSELFACTION:
            return {
                ...state, //old state data
                singletaskmanagentself:action.payload,// updated state data
            }
        default:
           return state;
    }

}