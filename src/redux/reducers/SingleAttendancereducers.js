import { actionType } from "../types/types";

const singleattendanceCountstate = {
    singleattendance:[],
}
export const SingleAttendancereducers = (state = singleattendanceCountstate,action)=>{
    switch (action.type ) {
        case actionType.SINGLEATTENDANCEACTION:
            return {
                ...state, //old state data
                singleattendance:action.payload,// updated state data
            }
        default:
           return state;
    }

}