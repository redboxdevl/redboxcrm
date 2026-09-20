import { actionType } from "../types/types";

const BillDuesummaryFlowCountstate = {
    billDuesummaryflowdata:[],
}
export const Billduesummaryreducers = (state = BillDuesummaryFlowCountstate,action)=>{
    switch (action.type ) {
        case actionType.BILLDUESUMMARYACTION:
            return {
                ...state, //old state data
                billDuesummaryflowdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}