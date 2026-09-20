import { actionType } from "../types/types";

const TalktimeCountstate = {
    talktimedata:[],
}
export const Talktimereducers = (state = TalktimeCountstate,action)=>{
    switch (action.type ) {
        case actionType.TALKTIMEACTION:
            return {
                ...state, //old state data
                talktimedata:action.payload,// updated state data
            }
        default:
           return state;
    }

}