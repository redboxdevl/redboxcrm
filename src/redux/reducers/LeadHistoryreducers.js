import { actionType } from "../types/types";

const leadhistoryCount = {
    leadhistoryreport:[],
}
export const LeadHistoryreducers = (state = leadhistoryCount,action)=>{
    switch (action.type ) {
        case actionType.LEADHISTORYACTION:
            return {
                ...state, //old state data
                leadhistoryreport:action.payload,// updated state data
            }
        default:
           return state;
    }

}