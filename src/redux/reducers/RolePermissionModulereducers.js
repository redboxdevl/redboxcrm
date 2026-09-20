import { actionType } from "../types/types";

const RolePermissionModuleCountstate = {
    rolepermissionmoduledata:[],
}
export const RolePermissionModulereducers = (state = RolePermissionModuleCountstate,action)=>{
    switch (action.type ) {
        case actionType.ROLEPERMISSIONMODULE:
            return {
                ...state, //old state data
                rolepermissionmoduledata:action.payload,// updated state data
            }
        default:
           return state;
    }

}