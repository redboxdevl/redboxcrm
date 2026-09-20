import { actionType } from "../types/types";

const listinventoriesfiltersCountstate = {
    listinventoriesfilterdata:[],
}
export const Listinventorisfiltersreducers = (state = listinventoriesfiltersCountstate,action)=>{
    switch (action.type ) {
        case actionType.LISTINVENTORIESFILTERS:
            return {
                ...state, //old state data
                listinventoriesfilterdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}
