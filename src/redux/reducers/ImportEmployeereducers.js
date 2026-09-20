import { actionType } from "../types/types";

const importemployeeCountstate = {
    importempdata:[],
}
export const ImportEmployeereducers = (state = importemployeeCountstate,action)=>{
    switch (action.type ) {
        case actionType.IMPORTEMPLOYEEACTION:
            return {
                ...state, //old state data
                importempdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}