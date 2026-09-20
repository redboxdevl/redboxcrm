import { actionType } from "../types/types";

const fixedassetfiltersCountstate = {
    fixedassetfiltersdata:[],
}
export const FixedAssetFiltersreducers = (state = fixedassetfiltersCountstate,action)=>{
    switch (action.type ) {
        case actionType.FIXEDASSETFILTERSACTION:
            return {
                ...state, //old state data
                fixedassetfiltersdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}