import { actionType } from "../types/types";

const callingCountstate = {
    callingcount:[],
}
export const Callingreducers = (state = callingCountstate,action)=>{
    switch (action.type ) {
        case actionType.CALLINGACTION:
            return {
                ...state, //old state data
                callingcount:action.payload,// updated state data
            }
        default:
           return state;
    }

}