import { actionType } from "../types/types";

const AssetCompanyFlowCountstate = {
    assetcompanyflowdata:[],
}
export const Assetcompanyflowreducers = (state = AssetCompanyFlowCountstate,action)=>{
    switch (action.type ) {
        case actionType.ASSETCOMPANYFLOWACTION:
            return {
                ...state, //old state data
                assetcompanyflowdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}