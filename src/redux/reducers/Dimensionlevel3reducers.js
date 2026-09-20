import { actionType } from "../types/types";

const Dimensionlist3Countstate = {
    dimensionlevel3data:[],
}
export const Dimensionlevel3reducers = (state = Dimensionlist3Countstate,action)=>{
    switch (action.type ) {
        case actionType.DIMENSIONLEVEL3:
            return {
                ...state, //old state data
                dimensionlevel3data:action.payload,// updated state data
            }
        default:
           return state;
    }

}