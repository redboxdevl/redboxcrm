import { actionType } from "../types/types";

const kpisreportCount = {
   kpireport:[],
}
export const Kpireducers = (state = kpisreportCount,action)=>{
    switch (action.type ) {
        case actionType.KPIREPORTS:
            return {
                ...state, //old state data
                kpireport:action.payload,// updated state data
            }
        default:
           return state;
    }

}