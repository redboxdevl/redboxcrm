import { actionType } from "../types/types";

const ChartlistCountstate = {
    chartlevel1data:[],
}
export const Chartlevelreducers = (state = ChartlistCountstate,action)=>{
    switch (action.type ) {
        case actionType.CHARTLEVEL1:
            return {
                ...state, //old state data
                chartlevel1data:action.payload,// updated state data
            }
        default:
           return state;
    }

}