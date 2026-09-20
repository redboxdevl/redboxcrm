import { actionType } from "../types/types";

const paymentVoucherfiltersCountstate = {
    paymentvoucherfiltersdata:[],
}
export const PaymentVoucherReportreducers = (state = paymentVoucherfiltersCountstate,action)=>{
    switch (action.type ) {
        case actionType.PAYMENTVOUCHERFILTERACTION:
            return {
                ...state, //old state data
                paymentvoucherfiltersdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}