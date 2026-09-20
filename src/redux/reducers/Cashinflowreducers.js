import { actionType } from "../types/types";

const CashinflowlistCountstate = {
    cashinflowdata:[],
}
export const Cashinflowreducers = (state = CashinflowlistCountstate,action)=>{
    switch (action.type ) {
        case actionType.CASHINFLOWACTION:
            return {
                ...state, //old state data
                cashinflowdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}