import { actionType } from "../types/types";

const SuperdatabaseCountstate = {
    superdatabasedata:[],
}
export const Superdatabasereducers = (state = SuperdatabaseCountstate,action)=>{
    switch (action.type ) {
        case actionType.SUPERDATABASEACTION:
            return {
                ...state, //old state data
                superdatabasedata:action.payload,// updated state data
            }
        default:
           return state;
    }

}