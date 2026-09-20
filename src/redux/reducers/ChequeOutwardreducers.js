import { actionType } from "../types/types";

const ChequeOutwardListCountstate = {
    chequeoutwardlist:[],
}
export const ChequeOutwardreducers = (state = ChequeOutwardListCountstate,action)=>{
    switch (action.type ) {
        case actionType.CHEQUEOUTWARDLISTACTION:
            return {
                ...state, //old state data
                chequeoutwardlist:action.payload,// updated state data
            }
        default:
           return state;
    }

}