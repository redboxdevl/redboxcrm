import { actionType } from "../types/types";

const allblockwiseplotCountstate = {
    allblockwiseplotdata:[],
}
export const AllBlockWisePlotreducers = (state = allblockwiseplotCountstate,action)=>{
    switch (action.type ) {
        case actionType.ALLBLOCKWISEPLOT:
            return {
                ...state, //old state data
                allblockwiseplotdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}