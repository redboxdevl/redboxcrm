import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"
export const SingleProjectInventoriesdata = (invId) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}projectinventory/${invId}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.SINGLEPROINVENTORIES,
                payload:GetArray,
            }
        )

    }
    
}