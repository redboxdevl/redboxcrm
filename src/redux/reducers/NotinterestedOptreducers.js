import { actionType } from "../types/types";

const notinterestedoptCountstate = {
    notinterestedoptdata:[],
}
export const NotinterestedOptreducers = (state = notinterestedoptCountstate,action)=>{
    switch (action.type ) {
        case actionType.NOTINTERESTEDREASONOPT:
            return {
                ...state, //old state data
                notinterestedoptdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}