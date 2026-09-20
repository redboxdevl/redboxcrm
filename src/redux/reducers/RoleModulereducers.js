import { actionType } from "../types/types";

const RoleModuleCountstate = {
    rolemoduledata:[],
}
export const RoleModulereducers = (state = RoleModuleCountstate,action)=>{
    switch (action.type ) {
        case actionType.ROLEMODULEACTION:
            return {
                ...state, //old state data
                rolemoduledata:action.payload,// updated state data
            }
        default:
           return state;
    }

}