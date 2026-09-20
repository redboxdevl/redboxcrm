import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const SingleInventorySoldAction = (id) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}inventorysold/${id}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data[0];
        dispatch(
            {
                type:actionType.SINGLEINVENTORIESSOLD,
                payload:GetArray,
            }
        )

    }
}




