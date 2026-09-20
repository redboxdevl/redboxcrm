import { actionType } from "../types/types";

const dashboardCountstate = {
    dashboardcount:[],
    showloading:false,
}
export const dashCountReducer = (state = dashboardCountstate,action)=>{
    switch (action.type ) {
        case actionType.DASHBOARD_COUNT:
            return {
                ...state, //old state data
                dashboardcount:action.payload,// updated state data
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