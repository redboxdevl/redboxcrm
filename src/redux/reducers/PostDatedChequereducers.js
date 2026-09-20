import { actionType } from "../types/types";

const postdatedchequeCountstate = {
    postdatedchequedata:[],
}
export const PostDatedChequereducers = (state = postdatedchequeCountstate,action)=>{
    switch (action.type ) {
        case actionType.POSTDATEDCHEQUEACTION:
            return {
                ...state, //old state data
                postdatedchequedata:action.payload,// updated state data
            }
        default:
           return state;
    }

}