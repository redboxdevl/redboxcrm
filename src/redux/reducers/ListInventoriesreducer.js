import { actionType } from "../types/types";

const listinventoriesCountstate = {
    listinventoriesdata:[],
}
export const ListInventoriesreducer = (state = listinventoriesCountstate,action)=>{
    switch (action.type ) {
        case actionType.LISTINVENTORIES:
            return {
                ...state, //old state data
                listinventoriesdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}
