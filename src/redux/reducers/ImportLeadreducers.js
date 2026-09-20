import { actionType } from "../types/types";

const importleadsCountstate = {
    singleimport:[],
}
export const ImportLeadreducers = (state = importleadsCountstate,action)=>{
    switch (action.type ) {
        case actionType.IMPORTLEADSACTION:
            return {
                ...state, //old state data
                singleimport:action.payload,// updated state data
            }
        default:
           return state;
    }

}