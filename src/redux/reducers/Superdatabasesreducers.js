import { actionType } from "../types/types";

const SuperdatabasesCountstate = {
    superdatabasesdata:[],
}
export const Superdatabasesreducers = (state = SuperdatabasesCountstate,action)=>{
    switch (action.type ) {
        case actionType.SUPERDATABASEACTIONS:
            return {
                ...state, //old state data
                superdatabasesdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}