import { actionType } from "../types/types";

const VoucherTypesCountstate = {
    vouchertypesdata:[],
}
export const Vouchertypereducers = (state = VoucherTypesCountstate,action)=>{
    switch (action.type ) {
        case actionType.VOUCHERTYPEACTION:
            return {
                ...state, //old state data
                vouchertypesdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}