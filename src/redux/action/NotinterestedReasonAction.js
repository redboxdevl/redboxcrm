import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const NotinterestedReasonAction = () =>{

    return async (dispatch,getState)=>{
        const response = await fetch(`${actionConfig.REACT_APP_URL}listnotinterestedreason`);
        const dataxs = await response.json();
        const finalDataMy = dataxs.data;
        dispatch(
            {
                type:actionType.NOTINTERESTEDREASONOPT,
                payload:finalDataMy,
            }
        )

    }
    
}
