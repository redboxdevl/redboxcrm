import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const SingleAttendanceAction = (attendanceId) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}attendance/${attendanceId}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.SINGLEATTENDANCEACTION,
                payload:GetArray,
            }
        )

    }
}