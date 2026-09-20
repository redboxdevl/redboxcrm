import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const SingleEmpAction = (agentId) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}employee/${agentId}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data[0];
        dispatch(
            {
                type:actionType.SINGLEEMPLOYEEACTION,
                payload:GetArray,
            }
        )

    }
}