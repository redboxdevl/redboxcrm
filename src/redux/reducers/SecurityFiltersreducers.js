import { actionType } from "../types/types";

const securityfiltersCountstate = {
    securityfiltersdata:[],
}
export const SecurityFiltersreducers = (state = securityfiltersCountstate,action)=>{
    switch (action.type ) {
        case actionType.SECURITYFILTERSACTION:
            return {
                ...state, //old state data
                securityfiltersdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}