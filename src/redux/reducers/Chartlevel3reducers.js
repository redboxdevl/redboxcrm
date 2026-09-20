import { actionType } from "../types/types";

const Chartlist3Countstate = {
    chartlevel3data:[],
}
export const Chartlevel3reducers = (state = Chartlist3Countstate,action)=>{
    switch (action.type ) {
        case actionType.CHARTLEVEL3:
            return {
                ...state, //old state data
                chartlevel3data:action.payload,// updated state data
            }
        default:
           return state;
    }

}