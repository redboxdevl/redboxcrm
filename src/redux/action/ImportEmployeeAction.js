import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const ImportEmployeeAction = (page,limit,search,teamObj,company_id) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}employee?teamObj=${teamObj}&company_id=${company_id}&orderBy=id&orderType=desc&page=${page}&perPage=${limit}&q=${search}`);
        const dataxs = await response.json();
        const GetArray = dataxs;
        dispatch(
            {
                type:actionType.IMPORTEMPLOYEEACTION,
                payload:GetArray,
            }
        )

    }
}