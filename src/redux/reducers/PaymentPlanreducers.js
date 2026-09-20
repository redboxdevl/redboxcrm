import { actionType } from "../types/types";

const PaymentplanreducerCountstate = {
    paymentplandata:[],
}
export const PaymentPlanreducers = (state = PaymentplanreducerCountstate,action)=>{
    switch (action.type ) {
        case actionType.PAYMENTPLANACTION:
            return {
                ...state, //old state data
                paymentplandata:action.payload,// updated state data
            }
        default:
           return state;
    }

}