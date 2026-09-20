import { actionType } from "../types/types";

const StockCountstate = {
    stocklistdata:[],
}
export const Stockregreducers = (state = StockCountstate,action)=>{
    switch (action.type ) {
        case actionType.STOCKREGISTERACTION:
            return {
                ...state, //old state data
                stocklistdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}