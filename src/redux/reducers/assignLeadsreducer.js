import { actionType } from "../types/types";

const assignleadsCountstate = {
    assignleaddata:[],
}
export const assignLeadsreducer = (state = assignleadsCountstate,action)=>{
    switch (action.type ) {
        case actionType.ASSIGN_LEADS:
            return {
                ...state, //old state data
                assignleaddata:action.payload,// updated state data
            }
        default:
           return state;
    }

}