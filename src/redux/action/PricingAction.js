import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const PricingAction = (page,limit) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}pricinglist?orderby=id&ordertype=desc&page=${page}&perpage=${limit}`);
        const dataxs = await response.json();
        const GetArray = dataxs;
        dispatch(
            {
                type:actionType.PRICINGACTION,
                payload:GetArray,
            }
        )

    }
}




