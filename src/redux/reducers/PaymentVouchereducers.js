import { actionType } from "../types/types";

const PaymentVouchersCountstate = {
    paymentvoucherdata:[],
}
export const PaymentVouchereducers = (state = PaymentVouchersCountstate,action)=>{
    switch (action.type ) {
        case actionType.PAYMENTVOUCHERACTION:
            return {
                ...state, //old state data
                paymentvoucherdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}