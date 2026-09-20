import { actionType } from "../types/types";

const RolecategoryCountstate = {
    rolecategorydata:[],
}
export const RoleCategoryreducers = (state = RolecategoryCountstate,action)=>{
    switch (action.type ) {
        case actionType.ROLECATEGORYACTION:
            return {
                ...state, //old state data
                rolecategorydata:action.payload,// updated state data
            }
        default:
           return state;
    }

}