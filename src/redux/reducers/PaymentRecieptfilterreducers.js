import { actionType } from "../types/types";

const paymentRecieptfiltersCountstate = {
    paymentrecieptfiltersdata:[],
}
export const PaymentRecieptfilterreducers = (state = paymentRecieptfiltersCountstate,action)=>{
    switch (action.type ) {
        case actionType.PAYMENTRECIEPTFILTERACTION:
            return {
                ...state, //old state data
                paymentrecieptfiltersdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}