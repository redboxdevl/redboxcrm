import { actionType } from "../types/types";

const zongcallingCountstate = {
    zongcallingdata:[],
}
export const ZoneCallingreducers = (state = zongcallingCountstate,action)=>{
    switch (action.type ) {
        case actionType.ZONGCALLINGDATAACTION:
            return {
                ...state, //old state data
                zongcallingdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}