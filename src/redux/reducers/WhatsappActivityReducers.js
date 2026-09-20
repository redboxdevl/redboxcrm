import { actionType } from "../types/types";

const WhatsappActivityCountstate = {
    whatsappactivitydata:[],
}
export const WhatsappActivityReducers = (state = WhatsappActivityCountstate,action)=>{
    switch (action.type ) {
        case actionType.WHATSAPPACTIVITIESACTION:
            return {
                ...state, //old state data
                whatsappactivitydata:action.payload,// updated state data
            }
        default:
           return state;
    }

}