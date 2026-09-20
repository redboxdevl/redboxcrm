import { actionType } from "../types/types";

const callstatusreportCount = {
    callstatusreport:[],
}
export const CallStatusreportreducers = (state = callstatusreportCount,action)=>{
    switch (action.type ) {
        case actionType.CALLSTATUSREPORTACTION:
            return {
                ...state, //old state data
                callstatusreport:action.payload,// updated state data
            }
        default:
           return state;
    }

}