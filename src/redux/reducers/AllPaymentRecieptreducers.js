import { actionType } from "../types/types";

const allpaymentRecieptCountstate = {
    allpaymentreciept:[],
}
export const AllPaymentRecieptreducers = (state = allpaymentRecieptCountstate,action)=>{
    switch (action.type ) {
        case actionType.ALLPAYMENTRECIEPTDATA:
            return {
                ...state, //old state data
                allpaymentreciept:action.payload,// updated state data
            }
        default:
           return state;
    }

}