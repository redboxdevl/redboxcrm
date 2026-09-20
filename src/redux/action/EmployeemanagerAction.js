import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const EmployeemanagerAction = (page,limit) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}employeemanagerslist?orderBy=id&orderType=desc&page=${page}&perPage=${limit}`);
        const dataxs = await response.json();
        const GetArray = dataxs;
        dispatch(
            {
                type:actionType.EMPLOYEEMANAGERACTION,
                payload:GetArray,
            }
        )

    }
}