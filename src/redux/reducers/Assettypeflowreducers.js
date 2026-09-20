import { actionType } from "../types/types";

const AssetTypeFlowCountstate = {
    assettypeflowdata:[],
}
export const Assettypeflowreducers = (state = AssetTypeFlowCountstate,action)=>{
    switch (action.type ) {
        case actionType.ASSETTYPEFLOWACTION:
            return {
                ...state, //old state data
                assettypeflowdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}