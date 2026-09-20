import { actionType } from "../types/types";

const PurchaseFormCountstate = {
    purchaseformdata:[],
}
export const Purchasereqformreducers = (state = PurchaseFormCountstate,action)=>{
    switch (action.type ) {
        case actionType.PURCHASEREQFORM:
            return {
                ...state, //old state data
                purchaseformdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}