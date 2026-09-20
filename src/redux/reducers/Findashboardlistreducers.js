import { actionType } from "../types/types";

const FindashboardlistCountstate = {
    findashboarddata:[],
}
export const Findashboardlistreducers = (state = FindashboardlistCountstate,action)=>{
    switch (action.type ) {
        case actionType.FINDASHBOARDLIST:
            return {
                ...state, //old state data
                findashboarddata:action.payload,// updated state data
            }
        default:
           return state;
    }

}