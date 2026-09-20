import { actionType } from "../types/types";

const reminderleadsCountstate = {
    reminderleaddata:[],
}
export const ReminderLeadsreducers = (state = reminderleadsCountstate,action)=>{
    switch (action.type ) {
        case actionType.REMINDERLEADS:
            return {
                ...state, //old state data
                reminderleaddata:action.payload,// updated state data
            }
        default:
           return state;
    }

}