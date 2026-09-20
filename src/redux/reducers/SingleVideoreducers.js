import { actionType } from "../types/types";

const singleVideoReqCountstate = {
    singlevideoreqdata:[],
}
export const SingleVideoreducers = (state = singleVideoReqCountstate,action)=>{
    switch (action.type ) {
        case actionType.SINGLEVIDEOREQ:
            return {
                ...state, //old state data
                singlevideoreqdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}