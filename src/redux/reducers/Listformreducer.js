import { actionType } from "../types/types";

const listformCountstate = {
    listformdata:[],
}
export const Listformreducer = (state = listformCountstate,action)=>{
    switch (action.type ) {
        case actionType.LISTFORMDATA:
            return {
                ...state, //old state data
                listformdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}