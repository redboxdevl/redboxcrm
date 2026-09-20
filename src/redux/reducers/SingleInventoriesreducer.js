import { actionType } from "../types/types";

const singleinventoriesCountstate = {
    singleinventoriesdata:[],
}
export const SingleInventoriesreducer = (state = singleinventoriesCountstate,action)=>{
    switch (action.type ) {
        case actionType.SINGLEINVENTORIES:
            return {
                ...state, //old state data
                singleinventoriesdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}