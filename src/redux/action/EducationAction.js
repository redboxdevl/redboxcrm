import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const EducationAction = (agentId) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}education`);
        const dataxs = await response.json();
        const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.EDUCATIONSACTION,
                payload:GetArray,
            }
        )

    }
}




