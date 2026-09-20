import { actionType } from "../types/types";

const hotleadsCountstate = {
    hotleaddata:[],
}
export const hotLeadsreducer = (state = hotleadsCountstate,action)=>{
    switch (action.type ) {
        case actionType.HOTLEADS:
            return {
                ...state, //old state data
                hotleaddata:action.payload,// updated state data
            }
        default:
           return state;
    }

}