import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const ListViewDealsAction = (agentId,page,limit,PlotNo,BlockName,Size,Project,Category,InvStatus,company_id) =>{
    return async function (dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}inventorysold?agentId=${agentId}&PlotNo=${PlotNo}&BlockName=${BlockName}&Size=${Size}&Project=${Project}&Category=${Category}&InvStatus=${InvStatus}&cusid=&company_id=${company_id}&orderBy=id&orderType=desc&page=${page}&perPage=${limit}`);
        const dataxs = await response.json();
        const GetArray = dataxs;
        dispatch(
            {
                type:actionType.DEALSDONEACTION,
                payload:GetArray,
            }
        )

    }
}