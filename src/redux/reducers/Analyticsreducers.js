import { actionType } from "../types/types";

const analyticsCountstate = {
   analyticsdata:[],
}
export const Analyticsreducers = (state = analyticsCountstate,action)=>{
    switch (action.type ) {
        case actionType.ANALYTICSACTION:
            return {
                ...state, //old state data
                analyticsdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}