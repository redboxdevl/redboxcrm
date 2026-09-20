import { actionType } from "../types/types";

const PayablebillsFilterreducersCountstate = {
    payablebillsFilterdata:[],
}
export const PayablebillsFilterreducers = (state = PayablebillsFilterreducersCountstate,action)=>{
    switch (action.type ) {
        case actionType.PAYBALEBILLSFILTERACTION:
            return {
                ...state, //old state data
                payablebillsFilterdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}