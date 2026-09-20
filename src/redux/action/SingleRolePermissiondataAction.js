import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"
export const SingleRolePermissiondataAction = (agentId) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}employeerole/${agentId}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.SINGLEROLEPERMISSIONDATA,
                payload:GetArray,
            }
        )

    }
    
}