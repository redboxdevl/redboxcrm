import { actionType } from "../types/types";

const inventoryfilterdataCountstate = {
    inventoryfilterdata:[],
}
export const Inventoryfilterdatareducers = (state = inventoryfilterdataCountstate,action)=>{
    switch (action.type ) {
        case actionType.INVENTORYFILTERDATA:
            return {
                ...state, //old state data
                inventoryfilterdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}