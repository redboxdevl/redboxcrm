import { actionType } from "../types/types";

const TlwleadsCountstate = {
    tlwleaddata:[],
}
export const Tlwleadreducers = (state = TlwleadsCountstate,action)=>{
    switch (action.type ) {
        case actionType.TLWLEADACTION:
            return {
                ...state, //old state data
                tlwleaddata:action.payload,// updated state data
            }
        default:
           return state;
    }

}