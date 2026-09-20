import { actionType } from "../types/types";

const CircularpolicyCountstate = {
    circularlistdata:[],
}
export const Circularpolicyreducers = (state = CircularpolicyCountstate,action)=>{
    switch (action.type ) {
        case actionType.CIRCULEPOLICY:
            return {
                ...state, //old state data
                circularlistdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}