import { actionType } from "../types/types";

const virginleadsCountstate = {
    virginleaddata:[],
}
export const VirginLeadsreducers = (state = virginleadsCountstate,action)=>{
    switch (action.type ) {
        case actionType.VIRGIN_LEADS:
            return {
                ...state, //old state data
                virginleaddata:action.payload,// updated state data
            }
        default:
           return state;
    }

}