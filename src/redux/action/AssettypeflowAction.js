import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const AssettypeflowAction = (company_id) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}assettypesflow?company_id=${company_id}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.ASSETTYPEFLOWACTION,
                payload:GetArray,
            }
        )

    }
}




