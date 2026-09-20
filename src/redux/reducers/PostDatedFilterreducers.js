import { actionType } from "../types/types";

const postdatedchequefiltersCountstate = {
    postdatedchequefilterdata:[],
}
export const PostDatedFilterreducers = (state = postdatedchequefiltersCountstate,action)=>{
    switch (action.type ) {
        case actionType.POSTDATEDCHEQUEFILTERSACTION:
            return {
                ...state, //old state data
                postdatedchequefilterdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}