import { actionType } from "../types/types";

const singledatareducersCountstate = {
    singledataredu:[],
}
export const Permissiondatareducers = (state = singledatareducersCountstate,action)=>{
    switch (action.type ) {
        case actionType.PERMISSIONDATAACTION:
            return {
                ...state, //old state data
                singledataredu:action.payload,// updated state data
            }
        default:
           return state;
    }

}