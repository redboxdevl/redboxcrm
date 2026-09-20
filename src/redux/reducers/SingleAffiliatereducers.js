import { actionType } from "../types/types";

const SingleAffiliateDataCountstate = {
    singleaffiliatedata:[],
}
export const SingleAffiliatereducers = (state = SingleAffiliateDataCountstate,action)=>{
    switch (action.type ) {
        case actionType.SINGLEAFFILIATELEADSMODULE:
            return {
                ...state, //old state data
                singleaffiliatedata:action.payload,// updated state data
            }
        default:
           return state;
    }

}