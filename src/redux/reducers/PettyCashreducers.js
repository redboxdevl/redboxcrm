import { actionType } from "../types/types";

const PettyCashCountstate = {
    pettycashdata:[],
}
export const PettyCashreducers = (state = PettyCashCountstate,action)=>{
    switch (action.type ) {
        case actionType.PETTYCASHACTION:
            return {
                ...state, //old state data
                pettycashdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}