import { actionType } from "../types/types";

const LeadImportDataCountstate = {
    leadimportdataitems:[],
}
export const Leadimportdatareducers = (state = LeadImportDataCountstate,action)=>{
    switch (action.type ) {
        case actionType.LEADIMPORTDATAACTION:
            return {
                ...state, //old state data
                leadimportdataitems:action.payload,// updated state data
            }
        default:
           return state;
    }

}