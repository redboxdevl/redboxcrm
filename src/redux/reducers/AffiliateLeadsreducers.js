import { actionType } from "../types/types";

const AffiliateLeadsModuleCountstate = {
    affiliateleadsdata:[],
}
export const AffiliateLeadsreducers = (state = AffiliateLeadsModuleCountstate,action)=>{
    switch (action.type ) {
        case actionType.AFFILIATELEADSMODULE:
            return {
                ...state, //old state data
                affiliateleadsdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}