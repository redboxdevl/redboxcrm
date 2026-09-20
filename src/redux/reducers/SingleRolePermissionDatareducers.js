import { actionType } from "../types/types";

const SingleRolePermissionDataCountstate = {
    singlerolepermissiondata:[],
}

export const SingleRolePermissionDatareducers = (state = SingleRolePermissionDataCountstate,action)=>{
    switch (action.type ) {
        case actionType.SINGLEROLEPERMISSIONDATA:
            return {
                ...state, //old state data
                singlerolepermissiondata:action.payload,// updated state data
            }
        default:
           return state;
    }

}