import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const EmployeeRolesAction = (id) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}listrolepermission?agentId=${id}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data[0];
        try{
            dispatch(
                    {
                        type:actionType.EMPLOYEEROLESACTION,
                        payload:GetArray,
                    }
                )
        }catch (error) {
            dispatch({
                type:actionType.EMPLOYEEROLESACTION,
                payload:error,
            });
          }
        

    }
}