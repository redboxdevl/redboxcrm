import { actionType } from "../types/types";

const Chartlist2Countstate = {
    chartlevel2data:[],
}
export const Chartlevel2reducers = (state = Chartlist2Countstate,action)=>{
    switch (action.type ) {
        case actionType.CHARTLEVEL2:
            return {
                ...state, //old state data
                chartlevel2data:action.payload,// updated state data
            }
        default:
           return state;
    }

}