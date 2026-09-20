import { actionType } from "../types/types";

const myleadsCountstate = {
    myleaddata:[],
}
export const myLeadsreducer = (state = myleadsCountstate,action)=>{
    switch (action.type ) {
        case actionType.MYLEADS:
            return {
                ...state, //old state data
                myleaddata:action.payload,// updated state data
            }
        default:
           return state;
    }

}