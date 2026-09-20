import { actionType } from "../types/types";

const alllistinginventoriesCountstate = {
    alllistingdata:[],
}
export const AllListingInventoriesreducers = (state = alllistinginventoriesCountstate,action)=>{
    switch (action.type ) {
        case actionType.ALLLISTINVENTORIES:
            return {
                ...state, //old state data
                alllistingdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}