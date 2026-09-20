import { actionType } from "../types/types";

const GeneratemappinglistCountstate = {
    generatemappingdata:[],
}
export const Generatemappingreducers = (state = GeneratemappinglistCountstate,action)=>{
    switch (action.type ) {
        case actionType.GENERATEMAPPINGACTION:
            return {
                ...state, //old state data
                generatemappingdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}