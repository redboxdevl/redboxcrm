import { actionType } from "../types/types";

const singleemployeeCountstate = {
    singleempdata:[],
}
export const SingleEmpreducers = (state = singleemployeeCountstate,action)=>{
    switch (action.type ) {
        case actionType.SINGLEEMPLOYEEACTION:
            return {
                ...state, //old state data
                singleempdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}