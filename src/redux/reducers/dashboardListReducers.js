import { actionType } from "../types/types";

const dashboardListstate = {
    dashboardlistcount:[],
    showloading:false,
}
export const dashboardListReducers = (state = dashboardListstate,action)=>{
    switch (action.type ) {
        case actionType.DASHBOARDLISTACTION:
            return {
                ...state, //old state data
                dashboardlistcount:action.payload,// updated state data
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