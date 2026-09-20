import { actionType } from "../types/types";

const ComplainCountstate = {
    complainlistdata:[],
}
export const Complainreducers = (state = ComplainCountstate,action)=>{
    switch (action.type ) {
        case actionType.COMPLAINMANAGEMENTACTION:
            return {
                ...state, //old state data
                complainlistdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}