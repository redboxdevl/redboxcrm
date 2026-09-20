import { actionType } from "../types/types";

const activitiesleadsCountstate = {
    activitiesleaddata:[],
}
export const Activitiesreducers = (state = activitiesleadsCountstate,action)=>{
    switch (action.type ) {
        case actionType.ACTIVITIESLEADS:
            return {
                ...state, //old state data
                activitiesleaddata:action.payload,// updated state data
            }
        default:
           return state;
    }

}