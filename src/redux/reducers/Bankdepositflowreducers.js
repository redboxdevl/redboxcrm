import { actionType } from "../types/types";

const BankdepositFlowCountstate = {
    bankdepositsflowdata:[],
}
export const Bankdepositflowreducers = (state = BankdepositFlowCountstate,action)=>{
    switch (action.type ) {
        case actionType.BANKDEPOSITFLOWACTION:
            return {
                ...state, //old state data
                bankdepositsflowdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}