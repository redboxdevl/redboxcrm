import { actionType } from "../types/types";

const leadstatusreportCount = {
    leadstatusreport:[],
}
export const Leadstatusreportreducers = (state = leadstatusreportCount,action)=>{
    switch (action.type ) {
        case actionType.LEADSTATUSREPORTACTION:
            return {
                ...state, //old state data
                leadstatusreport:action.payload,// updated state data
            }
        default:
           return state;
    }

}