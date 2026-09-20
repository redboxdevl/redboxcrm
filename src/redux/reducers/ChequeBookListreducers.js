import { actionType } from "../types/types";

const ChequeBookListCountstate = {
    chequebooklist:[],
}
export const ChequeBookListreducers = (state = ChequeBookListCountstate,action)=>{
    switch (action.type ) {
        case actionType.CHEQUELISTACTION:
            return {
                ...state, //old state data
                chequebooklist:action.payload,// updated state data
            }
        default:
           return state;
    }

}