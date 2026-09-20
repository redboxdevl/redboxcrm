import { actionType } from "../types/types";

const hrEmployeeCountstate = {
    hremployeedata:[],
}
export const Hremployeereducers = (state = hrEmployeeCountstate,action)=>{
    switch (action.type ) {
        case actionType.HREMPLOYEESACTION:
            return {
                ...state, //old state data
                hremployeedata:action.payload,// updated state data
            }
        default:
           return state;
    }

}