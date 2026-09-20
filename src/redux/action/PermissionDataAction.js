import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const PermissionDataAction = (PermissionData) =>{
    return async function (dispatch,getState){
        dispatch(
            {
                type:actionType.PERMISSIONDATAACTION,
                payload:PermissionData,
            }
        )
    }
}