import { actionType } from "../types/types";

const securityfilesCountstate = {
    securityfiledata:[],
}
export const SecurityFilesReducers = (state = securityfilesCountstate,action)=>{
    switch (action.type ) {
        case actionType.SECURITYFILESACTION:
            return {
                ...state, //old state data
                securityfiledata:action.payload,// updated state data
            }
        default:
           return state;
    }

}