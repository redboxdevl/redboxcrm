import { actionType } from "../types/types";

const bankListCountstate = {
    banklistdata:[],
}
export const Bankreducers = (state = bankListCountstate,action)=>{
    switch (action.type ) {
        case actionType.BANK_LIST_ACTION:
            return {
                ...state, //old state data
                banklistdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}