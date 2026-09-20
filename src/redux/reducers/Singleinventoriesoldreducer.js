import { actionType } from "../types/types";

const singleinventoriesSoldCountstate = {
    singleinventoriessolddata:[],
}
export const Singleinventoriesoldreducer = (state = singleinventoriesSoldCountstate,action)=>{
    switch (action.type ) {
        case actionType.SINGLEINVENTORIESSOLD:
            return {
                ...state, //old state data
                singleinventoriessolddata:action.payload,// updated state data
            }
        default:
           return state;
    }

}