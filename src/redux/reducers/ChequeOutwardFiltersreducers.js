import { actionType } from "../types/types";

const chequeoutwardfiltersCountstate = {
    chequeoutwardfiltersdata:[],
}
export const ChequeOutwardFiltersreducers = (state = chequeoutwardfiltersCountstate,action)=>{
    switch (action.type ) {
        case actionType.CHEQUEOUTWARDFILTERSACTION:
            return {
                ...state, //old state data
                chequeoutwardfiltersdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}