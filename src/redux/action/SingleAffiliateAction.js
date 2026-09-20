import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const SingleAffiliateAction = (id) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}affiliateleads/${id}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data[0];
        dispatch(
            {
                type:actionType.SINGLEAFFILIATELEADSMODULE,
                payload:GetArray,
            }
        )

    }
}