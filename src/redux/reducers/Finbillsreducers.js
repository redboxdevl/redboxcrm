import { actionType } from "../types/types";

const FinbillsCountstate = {
    findbleaddata:[],
}
export const Finbillsreducers = (state = FinbillsCountstate,action)=>{
    switch (action.type ) {
        case actionType.FINBILLSACTION:
            return {
                ...state, //old state data
                findbleaddata:action.payload,// updated state data
            }
        default:
           return state;
    }

}