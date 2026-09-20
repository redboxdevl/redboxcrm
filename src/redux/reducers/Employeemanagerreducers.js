import { actionType } from "../types/types";

const EmployeemanagerCountstate = {
    employeemanagerdata:[],
}
export const Employeemanagerreducers = (state = EmployeemanagerCountstate,action)=>{
    switch (action.type ) {
        case actionType.EMPLOYEEMANAGERACTION:
            return {
                ...state, //old state data
                employeemanagerdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}