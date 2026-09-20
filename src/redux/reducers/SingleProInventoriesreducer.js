import { actionType } from "../types/types";

const SingleProinventoriesCountstate = {
    singleproinventoriesdata:[],
}

export const SingleProInventoriesreducer = (state = SingleProinventoriesCountstate,action)=>{
    switch (action.type ) {
        case actionType.SINGLEPROINVENTORIES:
            return {
                ...state, //old state data
                singleproinventoriesdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}