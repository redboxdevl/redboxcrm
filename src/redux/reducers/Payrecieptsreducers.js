import { actionType } from "../types/types";

const PayrecieptsCountstate = {
    payrecieptsdata:[],
}
export const Payrecieptsreducers = (state = PayrecieptsCountstate,action)=>{
    switch (action.type ) {
        case actionType.PAYRECIEPTSACTION:
            return {
                ...state, //old state data
                payrecieptsdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}