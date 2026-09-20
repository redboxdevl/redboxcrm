import { actionType } from "../types/types";

const PettyCashflowlistCountstate = {
    pettycashindata:[],
}
export const Pettycashflowreducers = (state = PettyCashflowlistCountstate,action)=>{
    switch (action.type ) {
        case actionType.PETTYCASHINFLOWACTION:
            return {
                ...state, //old state data
                pettycashindata:action.payload,// updated state data
            }
        default:
           return state;
    }

}