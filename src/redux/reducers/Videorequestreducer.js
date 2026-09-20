import { actionType } from "../types/types";

const videoreqCountstate = {
    videoreqdata:[],
}
export const Videorequestreducer = (state = videoreqCountstate,action)=>{
    switch (action.type ) {
        case actionType.VIDEOFORMACTION:
            return {
                ...state, //old state data
                videoreqdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}