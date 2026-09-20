import { actionType } from "../types/types";

const DimensionlistCountstate = {
    dimensionlevel1data:[],
}
export const Dimensionlevelreducers = (state = DimensionlistCountstate,action)=>{
    switch (action.type ) {
        case actionType.DIMENSIONLEVEL1:
            return {
                ...state, //old state data
                dimensionlevel1data:action.payload,// updated state data
            }
        default:
           return state;
    }

}