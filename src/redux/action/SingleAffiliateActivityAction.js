import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const SingleAffiliateActivityAction = (id) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}affiliateactivity/${id}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.SINGLEAFFILIATEACTIVITY,
                payload:GetArray,
            }
        )

    }
}