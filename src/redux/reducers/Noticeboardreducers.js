import { actionType } from "../types/types";

const noticeboardleadsCountstate = {
    noticeboardleaddata:[],
}
export const Noticeboardreducers = (state = noticeboardleadsCountstate,action)=>{
    switch (action.type ) {
        case actionType.NOTICEBOARDACTION:
            return {
                ...state, //old state data
                noticeboardleaddata:action.payload,// updated state data
            }
        default:
           return state;
    }

}