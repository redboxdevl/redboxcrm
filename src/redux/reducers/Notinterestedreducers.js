import { actionType } from "../types/types";

const notinterestedleadsCountstate = {
    Notinterestedleaddata:[],
}
export const NotinterestedLeadsreducers = (state = notinterestedleadsCountstate,action)=>{
    switch (action.type ) {
        case actionType.NOTINTERESTEDLEADS:
            return {
                ...state, //old state data
                Notinterestedleaddata:action.payload,// updated state data
            }
        default:
           return state;
    }

}