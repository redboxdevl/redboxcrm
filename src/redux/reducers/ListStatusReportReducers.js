import { actionType } from "../types/types";

const liststatusreportCount = {
    liststatusreport:[],
    showloading:false,
}
export const ListStatusReportReducers = (state = liststatusreportCount,action)=>{
    switch (action.type ) {
        case actionType.LISTSTATUSREPORTACTION:
            return {
                ...state, //old state data
                liststatusreport:action.payload,// updated state data
                showloading:false,
            }
        case actionType.LOADINGTOGGLEACTION:
            return {
                ...state, //old state data
                showloading:action.payload,// updated state data
            }
        default:
           return state;
    }

}