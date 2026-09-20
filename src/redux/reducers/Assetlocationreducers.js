import { actionType } from "../types/types";

const AssetLocationFlowCountstate = {
    assetlocationflowdata:[],
}
export const Assetlocationreducers = (state = AssetLocationFlowCountstate,action)=>{
    switch (action.type ) {
        case actionType.ASSETLOCATIONFLOWACTION:
            return {
                ...state, //old state data
                assetlocationflowdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}