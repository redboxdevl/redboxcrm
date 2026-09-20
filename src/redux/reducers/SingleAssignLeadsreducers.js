import { actionType } from "../types/types";

const singleleadsassigncount = {
    singleassignleads:[],
}
export const SingleAssignLeadsreducers = (state = singleleadsassigncount,action)=>{
    switch (action.type ) {
        case actionType.SINGLEASSIGNLEADSACTION:
            return {
                ...state, //old state data
                singleassignleads:action.payload,// updated state data
            }
        default:
           return state;
    }

}