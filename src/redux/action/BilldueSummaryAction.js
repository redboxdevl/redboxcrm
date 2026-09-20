import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const BilldueSummaryAction = (company_id) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}billduesummaryflow?company_id=${company_id}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.BILLDUESUMMARYACTION,
                payload:GetArray,
            }
        )

    }
}




