import { actionType } from "../types/types";

const videocatleadsCountstate = {
    videocatleaddata:[],
}
export const VideoCatreducers = (state = videocatleadsCountstate,action)=>{
    switch (action.type ) {
        case actionType.VIDEOCATACTION:
            return {
                ...state, //old state data
                videocatleaddata:action.payload,// updated state data
            }
        default:
           return state;
    }

}