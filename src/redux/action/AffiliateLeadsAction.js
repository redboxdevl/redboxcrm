import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const AffiliateLeadsAction = (affiliateId) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}affiliateleads?affiliateId=${affiliateId}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.AFFILIATELEADSMODULE,
                payload:GetArray,
            }
        )

    }
}