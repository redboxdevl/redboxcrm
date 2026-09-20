import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const FinanceDashboardAction = (company_id) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}findashboardlist?company_id=${company_id}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.FINDASHBOARDLIST,
                payload:GetArray,
            }
        )

    }
}




