import { actionType } from "../types/types";

const inventoriesCountstate = {
    inventoriesdata:[],
}
export const inventoriesreducer = (state = inventoriesCountstate,action)=>{
    switch (action.type ) {
        case actionType.INVENTORIES:
            return {
                ...state, //old state data
                inventoriesdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}