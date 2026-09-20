import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const RolePermissionModuleAction = (agentId) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}rolepermission`);
        const dataxs = await response.json();
        const GetArray = dataxs;
        dispatch(
            {
                type:actionType.ROLEPERMISSIONMODULE,
                payload:GetArray,
            }
        )

    }
}