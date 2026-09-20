import { actionType } from "../types/types";

const PayrollreducerCountstate = {
    payrolldata:[],
}
export const Payrollreducer = (state = PayrollreducerCountstate,action)=>{
    switch (action.type ) {
        case actionType.PAYROLL_ACTION:
            return {
                ...state, //old state data
                payrolldata:action.payload,// updated state data
            }
        default:
           return state;
    }

}