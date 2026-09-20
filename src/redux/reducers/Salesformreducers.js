import { actionType } from "../types/types";

const SalesFormCountstate = {
    salesformdata:[],
}
export const Salesformreducers = (state = SalesFormCountstate,action)=>{
    switch (action.type ) {
        case actionType.SALESFORMACTION:
            return {
                ...state, //old state data
                salesformdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}