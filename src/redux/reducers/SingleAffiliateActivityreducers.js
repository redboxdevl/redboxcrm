import { actionType } from "../types/types";

const SingleAffiliateActivtyDataCountstate = {
    singleaffiliateactivtydata:[],
}
export const SingleAffiliateActivityreducers = (state = SingleAffiliateActivtyDataCountstate,action)=>{
    switch (action.type ) {
        case actionType.SINGLEAFFILIATEACTIVITY:
            return {
                ...state, //old state data
                singleaffiliateactivtydata:action.payload,// updated state data
            }
        default:
           return state;
    }

}