import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const SingleVideoReqAction = (id) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}videorequest/${id}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.SINGLEVIDEOREQ,
                payload:GetArray,
            }
        )

    }
}
