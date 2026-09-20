import { actionType } from "../types/types";

const DailyLeadsReportingCountstate = {
   dailyleadsreportingdata:[],
}
export const Dailyleadsreportingreducers = (state = DailyLeadsReportingCountstate,action)=>{
    switch (action.type ) {
        case actionType.DAILYLEADSREPORTING:
            return {
                ...state, //old state data
                dailyleadsreportingdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}