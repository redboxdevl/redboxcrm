import { actionType } from "../types/types";

const stockfiltersCountstate = {
    stockfiltersdata:[],
}
export const stockFiltersreducers = (state = stockfiltersCountstate,action)=>{
    switch (action.type ) {
        case actionType.STOCKFILTERSACTION:
            return {
                ...state, //old state data
                stockfiltersdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}