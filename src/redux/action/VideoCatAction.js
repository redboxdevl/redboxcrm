import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const VideoCatAction = () =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}videocategory`);
        const dataxs = await response.json();
        const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.VIDEOCATACTION,
                payload:GetArray,
            }
        )

    }
}




