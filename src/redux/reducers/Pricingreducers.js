import { actionType } from "../types/types";

const pricingreducersCountstate = {
    pricingdata:[],
}
export const Pricingreducers = (state = pricingreducersCountstate,action)=>{
    switch (action.type ) {
        case actionType.PRICINGACTION:
            return {
                ...state, //old state data
                pricingdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}