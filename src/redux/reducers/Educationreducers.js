import { actionType } from "../types/types";

const EducationsCountstate = {
    educationdata:[],
}
export const Educationreducers = (state = EducationsCountstate,action)=>{
    switch (action.type ) {
        case actionType.EDUCATIONSACTION:
            return {
                ...state, //old state data
                educationdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}