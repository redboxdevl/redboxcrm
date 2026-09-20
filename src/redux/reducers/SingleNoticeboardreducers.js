import { actionType } from "../types/types";

const SingleNoticeBoardCountstate = {
    singlenoticeboard:[],
}

export const SingleNoticeboardreducers = (state = SingleNoticeBoardCountstate,action)=>{
    switch (action.type ) {
        case actionType.SINGLENOTICEBOARD:
            return {
                ...state, //old state data
                singlenoticeboard:action.payload,// updated state data
            }
        default:
           return state;
    }

}