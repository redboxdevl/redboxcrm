import { actionType } from "../types/types";

const assetListCountstate = {
    assetlistdata:[],
}
export const AssetListreducers = (state = assetListCountstate,action)=>{
    switch (action.type ) {
        case actionType.ASSETLISTACTION:
            return {
                ...state, //old state data
                assetlistdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}