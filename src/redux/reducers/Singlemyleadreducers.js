import { actionType } from "../types/types";

const singlecustomerCountstate = {
    singlecustomerdata:[],
}
export const Singlemyleadreducers = (state = singlecustomerCountstate,action)=>{
    switch (action.type ) {
        case actionType.SINGLEMYLEAD:
            return {
                ...state, //old state data
                singlecustomerdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}