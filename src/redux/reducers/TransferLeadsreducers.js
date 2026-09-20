import { actionType } from "../types/types";

const SingleTransferLeadsCountstate = {
    singletransferleadsdata:[],
}

export const TransferLeadsreducers = (state = SingleTransferLeadsCountstate,action)=>{
    switch (action.type ) {
        case actionType.TRANSFERLEADSACTION:
            return {
                ...state, //old state data
                singletransferleadsdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}