import { actionType } from "../types/types";

const BankFlowCount = {
    bankflowdata:[],
}
export const Bankflowreducers = (state = BankFlowCount,action)=>{
    switch (action.type ) {
        case actionType.BANKFLOWACTION:
            return {
                ...state, //old state data
                bankflowdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}