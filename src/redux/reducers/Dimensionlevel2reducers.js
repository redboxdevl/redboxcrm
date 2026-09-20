import { actionType } from "../types/types";

const Dimensionlist2Countstate = {
    dimensionlevel2data:[],
}
export const Dimensionlevel2reducers = (state = Dimensionlist2Countstate,action)=>{
    switch (action.type ) {
        case actionType.DIMENSIONLEVEL2:
            return {
                ...state, //old state data
                dimensionlevel2data:action.payload,// updated state data
            }
        default:
           return state;
    }

}