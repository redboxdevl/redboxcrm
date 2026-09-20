import { actionType } from "../types/types";

const BankdepositCountstate = {
    bankdepositsdata:[],
}
export const Bankdepositreducers = (state = BankdepositCountstate,action)=>{
    switch (action.type ) {
        case actionType.BANK_DEPOSITS_ACTION:
            return {
                ...state, //old state data
                bankdepositsdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}