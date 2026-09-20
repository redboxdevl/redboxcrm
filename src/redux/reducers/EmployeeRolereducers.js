import { actionType } from "../types/types";

const employeeRoleCountstate = {
    employeeroledata:[],
}
export const EmployeeRolereducers = (state = employeeRoleCountstate,action)=>{
    switch (action.type ) {
        case actionType.EMPLOYEEROLESACTION:
            return {
                ...state, //old state data
                employeeroledata:action.payload,// updated state data
            }
        default:
           return state;
    }

}