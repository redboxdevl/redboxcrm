import { actionType } from "../types/types";

const BillsummaryFlowCountstate = {
    billsummaryflowdata:[],
}
export const Billsummaryreducers = (state = BillsummaryFlowCountstate,action)=>{
    switch (action.type ) {
        case actionType.BILLSUMMARYACTION:
            return {
                ...state, //old state data
                billsummaryflowdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}