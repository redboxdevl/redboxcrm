import { actionType } from "../types/types";

const singleattendanceCountstate = {
    singleattendancedata:[],
}
export const Attendancereducers = (state = singleattendanceCountstate,action)=>{
    switch (action.type ) {
        case actionType.ATTENDANCEACTION:
            return {
                ...state, //old state data
                singleattendancedata:action.payload,// updated state data
            }
        default:
           return state;
    }

}