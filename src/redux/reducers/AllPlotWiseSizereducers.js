import { actionType } from "../types/types";

const allplotwisesizeCountstate = {
    allplotwisesizedata:[],
}
export const AllPlotWiseSizereducers = (state = allplotwisesizeCountstate,action)=>{
    switch (action.type ) {
        case actionType.ALLPLOTWISESIZE:
            return {
                ...state, //old state data
                allplotwisesizedata:action.payload,// updated state data
            }
        default:
           return state;
    }

}