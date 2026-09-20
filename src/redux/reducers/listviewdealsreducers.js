import { actionType } from "../types/types";

const listviewdealsCountstate = {
    listviewdealdata:[],
}
export const listviewdealsreducers = (state = listviewdealsCountstate,action)=>{
    switch (action.type ) {
        case actionType.DEALSDONEACTION:
            return {
                ...state, //old state data
                listviewdealdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}